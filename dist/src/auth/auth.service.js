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
const library_1 = require("@prisma/client/runtime/library");
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
        if (user && (await argon2.verify(user.password, password))) {
            return user;
        }
        return null;
    }
    async regist(userdto) {
        try {
            const user = await this.userService.create(userdto);
            const tokens = await this.getTokens(user);
            await this._updateRefreshToken(user.id, tokens.refreshToken);
            return tokens;
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                throw e;
            }
            if (e instanceof library_1.PrismaClientKnownRequestError && e.code === 'P2002') {
                const fields = Array.isArray(e.meta?.target)
                    ? e.meta.target.join(', ')
                    : String(e.meta?.target);
                throw new common_1.BadRequestException(`Пользователь с таким(и) полем(ями) «${fields}» уже существует`);
            }
            console.error(e);
            throw new common_1.InternalServerErrorException('Произошла непредвиденная ошибка при регистрации');
        }
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
        return { tokens, accept: user.role === 1 || user.role === 0 };
    }
    async recoverPas(user, _data) {
        if (_data.newpas.length < 6) {
            throw new common_1.BadRequestException(`Слишком короткий пароль`);
        }
        const User = await this.userService.findByIdWithPas(user.id);
        console.log(User, _data, '_________________________________');
        if (User && (await argon2.verify(User.password, _data.pas))) {
            const hash = await argon2.hash(_data.newpas);
            return this.userService.updateUser(User.id, { password: hash });
        }
        else {
            throw new common_1.BadRequestException(`Текущий пароль не верный`);
        }
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
        console.table(await this.userService.findById(user));
        return await this.userService.findById(user);
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