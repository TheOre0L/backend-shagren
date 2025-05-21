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
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    log;
    constructor() {
        this.log = new common_1.Logger('ExceptionFilter');
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = 500;
        let message = 'Internal server error';
        let code = '0';
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const response = exception.getResponse();
            if (typeof response === 'string') {
                message = response;
            }
            else if (typeof response === 'object') {
                message = response.message;
            }
        }
        else if (exception instanceof library_1.PrismaClientKnownRequestError) {
            code = exception.code;
            status = 400;
            message = exception.message;
        }
        else if (exception instanceof Error) {
            message = exception.message;
        }
        this.log.debug(exception);
        const errorJSON = {
            message,
            code,
            timestamp: new Date(),
        };
        response.status(status).json(errorJSON);
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [])
], GlobalExceptionFilter);
//# sourceMappingURL=globalExceptions.handler.js.map