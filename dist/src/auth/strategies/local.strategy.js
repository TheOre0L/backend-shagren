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
var LocalStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
const core_1 = require("@nestjs/core");
let LocalStrategy = LocalStrategy_1 = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    moduleRef;
    log = new common_1.Logger(LocalStrategy_1.name);
    constructor(moduleRef) {
        super({
            passReqToCallback: true,
            usernameField: 'email',
            passwordField: 'password',
        });
        this.moduleRef = moduleRef;
    }
    async validate(request, email, password) {
        const contextId = core_1.ContextIdFactory.getByRequest(request);
        const authService = await this.moduleRef.resolve(auth_service_1.AuthService, contextId);
        const user = await authService.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Неверный логин или пароль');
        }
        if (!user.isActive) {
            this.log.warn(`Пользователь ${user.id} отключен`);
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = LocalStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], LocalStrategy);
//# sourceMappingURL=local.strategy.js.map