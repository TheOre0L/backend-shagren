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
exports.RefreshTokenStrategy = exports.AccessTokenStrategy = exports.extractRefreshTokenFromCookies = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
const extractRefreshTokenFromCookies = (req) => {
    const cookies = req.headers.cookie?.split('; ');
    if (!cookies?.length) {
        return null;
    }
    const refreshTokenCookie = cookies.find((cookie) => cookie.startsWith(`refreshToken=`));
    if (!refreshTokenCookie) {
        return null;
    }
    return refreshTokenCookie.split('=')[1];
};
exports.extractRefreshTokenFromCookies = extractRefreshTokenFromCookies;
let AccessTokenStrategy = class AccessTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    config;
    authService;
    constructor(config, authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('auth.accessSecret'),
        });
        this.config = config;
        this.authService = authService;
    }
    async validate(payload) {
        if (!(await this.authService.isUserActive(payload.sub))) {
            throw new common_1.UnauthorizedException();
        }
        return { userId: payload.sub, name: payload.name, role: payload.role };
    }
};
exports.AccessTokenStrategy = AccessTokenStrategy;
exports.AccessTokenStrategy = AccessTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], AccessTokenStrategy);
let RefreshTokenStrategy = class RefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    config;
    authService;
    constructor(config, authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (req) => (0, exports.extractRefreshTokenFromCookies)(req),
            ]),
            ignoreExpiration: false,
            secretOrKey: config.get('auth.refreshSecret'),
            passReqToCallback: true,
        });
        this.config = config;
        this.authService = authService;
    }
    async validate(req, payload) {
        if (!(await this.authService.isUserActive(payload.sub))) {
            throw new common_1.UnauthorizedException();
        }
        const refreshToken = (0, exports.extractRefreshTokenFromCookies)(req);
        return { userId: payload.sub, name: payload.name, refreshToken };
    }
};
exports.RefreshTokenStrategy = RefreshTokenStrategy;
exports.RefreshTokenStrategy = RefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], RefreshTokenStrategy);
//# sourceMappingURL=jwt.strategy.js.map