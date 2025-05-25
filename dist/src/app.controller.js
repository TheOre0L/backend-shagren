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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = exports.RecoverPasswordDto = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const auth_service_1 = require("./auth/auth.service");
const local_auth_guard_1 = require("./auth/guards/local-auth.guard");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const throttler_1 = require("@nestjs/throttler");
const app_dto_1 = require("./app.dto");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const nestjs_prisma_1 = require("nestjs-prisma");
const dto_1 = require("./user/dto");
const class_validator_1 = require("class-validator");
const user_service_1 = require("./user/user.service");
class RecoverPasswordDto {
    pas;
    newpas;
}
exports.RecoverPasswordDto = RecoverPasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Текущий пароль обязателен' }),
    __metadata("design:type", String)
], RecoverPasswordDto.prototype, "pas", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Новый пароль должен быть не короче 6 символов' }),
    __metadata("design:type", String)
], RecoverPasswordDto.prototype, "newpas", void 0);
let AppController = class AppController {
    appService;
    authService;
    userService;
    configService;
    prisma;
    logger;
    uploadPath;
    constructor(appService, authService, userService, configService, prisma) {
        this.appService = appService;
        this.authService = authService;
        this.userService = userService;
        this.configService = configService;
        this.prisma = prisma;
        this.logger = new common_1.Logger('AppController');
    }
    hello() {
        return this.appService.getHello();
    }
    uploadFile(file) {
        return this.appService.handleFileUpload(file);
    }
    async regist(registData, res) {
        try {
            const user = await this.authService.regist(registData);
            return res.send(user);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                return res.status(error.getStatus()).json(error.getResponse());
            }
            return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
        }
    }
    async login(req, res, _login) {
        const tokens = await this.authService.login(req.user, _login);
        this.authService.setRefreshTokenCookie(res, tokens.refreshToken);
        return res.send(tokens);
    }
    async refreshTokens(req, res) {
        const { user: { userId, refreshToken }, } = req;
        try {
            const { tokens, accept } = await this.authService.updateTokens(userId, refreshToken);
            this.authService.setRefreshTokenCookie(res, tokens.refreshToken);
            res.send({
                refreshToken: tokens.refreshToken,
                accessToken: tokens.accessToken,
                accept: accept,
            });
        }
        catch (e) {
            this.logger.error(e);
        }
    }
    async recoverPas(req, _data) {
        return await this.authService.recoverPas(req.user, _data);
    }
    settings(data, req) {
        return this.userService.updateUser(req.user.userId, data);
    }
    async getProfile(req) {
        if (!req.user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const userr = await this.authService.getProfile(req.user.userId);
        if (!userr) {
            throw new common_1.NotFoundException('User not found');
        }
        return userr;
    }
    async logout(req, res) {
        await this.authService.logout(req.user.userId);
        this.authService.clearRefreshTokenCookie(res);
        return res.send();
    }
    clearRefreshToken(res) {
        this.authService.clearRefreshTokenCookie(res);
        return res.send();
    }
    setHomePage(body) {
        return this.prisma.homePage.update({
            where: { id: 1 },
            data: { ...body },
        });
    }
    async getHomePage() {
        const homePage = await this.prisma.homePage.findUnique({
            where: { id: 1 },
        });
        if (homePage) {
            const { id, ...dataWithoutId } = homePage;
            return dataWithoutId;
        }
        return null;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "hello", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('regist'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegistrationDTO, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "regist", null);
__decorate([
    (0, throttler_1.Throttle)({
        short: { limit: 1, ttl: 1000 },
        long: { limit: 2, ttl: 60000 },
    }),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Вход' }),
    (0, swagger_1.ApiOkResponse)({ type: app_dto_1.TokensResponseDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, app_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('refreshTokens'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.RefreshTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.Post)('pass'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AccessTokenGuard),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Изменение пароля' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RecoverPasswordDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "recoverPas", null);
__decorate([
    (0, common_1.Patch)(`settings`),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AccessTokenGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "settings", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AccessTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AccessTokenGuard),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('clear'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "clearRefreshToken", null);
__decorate([
    (0, common_1.Patch)('home'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setHomePage", null);
__decorate([
    (0, common_1.Get)('home'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHomePage", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        auth_service_1.AuthService,
        user_service_1.UserService,
        config_1.ConfigService,
        nestjs_prisma_1.PrismaService])
], AppController);
//# sourceMappingURL=app.controller.js.map