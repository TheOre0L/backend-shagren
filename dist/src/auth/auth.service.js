"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const ms = require("ms");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    jwtService;
    userService;
    configService;
    constructor(jwtService, userService, configService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmailWithCreds(email);
        console.log(user);
        if (user && (await argon2.verify(user.password, password))) {
            return user;
        }
        return null;
    }
    async regist(userdto) {
        const user = await this.userService.create(userdto);
        const tokens = await this.getTokens(user);
        await this._updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async login(user, login) {
        const User = await this.validateUser(login.email, login.password);
        const tokens = await this.getTokens(User);
        await this._updateRefreshToken(User.id, tokens.refreshToken);
        return tokens;
    }
    logout(userId) {
        return this.userService.update(userId, undefined);
    }
    async isUserActive(userId) {
        const maybeUser = await this.userService.findById(userId);
        return maybeUser && maybeUser.isActive;
    }
    async getTokens(user) {
        const payload = { sub: user.id, name: user.fio, role: user.role };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('auth.accessSecret'),
                expiresIn: this.configService.get('auth.accessExpiresIn'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('auth.refreshSecret'),
                expiresIn: this.configService.get('auth.refreshExpiresIn'),
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async updateTokens(userId, refreshToken) {
        const user = await this.userService.findByIdWithCreds(userId);
        if (!user || !user.refreshToken)
            throw new common_1.ForbiddenException('Access Denied');
        if (refreshToken !== user.refreshToken) {
            await this.logout(userId);
            throw new common_1.ForbiddenException('Вы не авторизованы');
        }
        const tokens = await this.getTokens(user);
        await this._updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    setRefreshTokenCookie(res, refreshToken) {
        console.log('✅ Устанавливаем refreshToken:', refreshToken);
        const rtExpiresIn = this.configService.get('auth.refreshExpiresIn');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.cookie('refreshToken', refreshToken, {
            expires: new Date(new Date().getTime() + ms(rtExpiresIn)),
            path: '/',
            httpOnly: true,
        });
        console.log('✅ Cookie установлены:', res.getHeaders()['set-cookie']);
    }
    clearRefreshTokenCookie(res) {
        res.clearCookie('refreshToken', {
            path: '/',
        });
    }
    async _updateRefreshToken(userId, refreshToken) {
        const a = await this.userService.update(userId, refreshToken);
        console.log('????????????????', a, userId, refreshToken);
    }
    async getProfile(user) {
        return this.userService.findById(user.id);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map