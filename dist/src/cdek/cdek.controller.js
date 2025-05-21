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
exports.CdekController = void 0;
const common_1 = require("@nestjs/common");
const cdek_service_1 = require("./cdek.service");
const mod_1 = require("./external/mod");
const swagger_1 = require("@nestjs/swagger");
let CdekController = class CdekController {
    cdekService;
    constructor(cdekService) {
        this.cdekService = cdekService;
    }
    widgetServiceGet(is_handout, action, page, size, response) {
        const params = {
            is_handout,
            action,
            page,
            size,
        };
        return this.cdekService.widgetProcess(action, params, response);
    }
    widgetServicePost(params, response) {
        return this.cdekService.widgetProcess(params.action, params, response);
    }
    calculateTariffPrice(action, params, response) {
        return this.cdekService.calculationTariffPrice(action, params, response);
    }
    orderServicePost(action, params, response) {
        return this.cdekService.orderProcess(action, params, response);
    }
    orderServicePatch(action, params, response) {
        return this.cdekService.orderProcess(action, params, response);
    }
    orderServiceDelete(action, uuid, response) {
        return this.cdekService.orderProcess(action, uuid, response);
    }
    orderServiceGet(action, uuid, response) {
        return this.cdekService.orderProcess(action, uuid, response);
    }
    webhookServiceGet(action, uuid, response) {
        return this.cdekService.webhookProcess(action, uuid, response);
    }
    webhookServicePost(action, params, response) {
        return this.cdekService.webhookProcess(action, params, response);
    }
    webhookServiceDelete(action, uuid, response) {
        return this.cdekService.webhookProcess(action, uuid, response);
    }
};
exports.CdekController = CdekController;
__decorate([
    (0, common_1.Get)('widget'),
    (0, common_1.Header)('Access-Control-Expose-Headers', '*'),
    __param(0, (0, common_1.Query)('is_handout')),
    __param(1, (0, common_1.Query)('action')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('size')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Number, Number, Object]),
    __metadata("design:returntype", void 0)
], CdekController.prototype, "widgetServiceGet", null);
__decorate([
    (0, common_1.Post)('widget'),
    (0, common_1.Header)('Access-Control-Expose-Headers', '*'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CdekController.prototype, "widgetServicePost", null);
__decorate([
    (0, common_1.Post)('calculate'),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CdekController.prototype, "calculateTariffPrice", null);
__decorate([
    (0, common_1.Post)('order'),
    (0, common_1.Header)('Access-Control-Expose-Headers', '*'),
    (0, swagger_1.ApiOperation)({ summary: 'Работа с доставкой CDEK' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Не найдено' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Неверно заданы параметры' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Доступ запрещен' }),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CdekController.prototype, "orderServicePost", null);
__decorate([
    (0, common_1.Patch)('order'),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CdekController.prototype, "orderServicePatch", null);
__decorate([
    (0, common_1.Delete)('order'),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Query)('uuid')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CdekController.prototype, "orderServiceDelete", null);
__decorate([
    (0, common_1.Get)('order'),
    (0, common_1.Header)('Access-Control-Expose-Headers', '*'),
    (0, swagger_1.ApiOperation)({ summary: 'Работа с доставкой CDEK' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Не найдено' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Неверно заданы параметры' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Доступ запрещен' }),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Query)('uuid')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CdekController.prototype, "orderServiceGet", null);
__decorate([
    (0, common_1.Get)('webhook'),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Query)('uuid')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CdekController.prototype, "webhookServiceGet", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CdekController.prototype, "webhookServicePost", null);
__decorate([
    (0, common_1.Delete)('webhook'),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Query)('uuid')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CdekController.prototype, "webhookServiceDelete", null);
exports.CdekController = CdekController = __decorate([
    (0, common_1.Controller)('cdek'),
    __metadata("design:paramtypes", [cdek_service_1.CdekService])
], CdekController);
//# sourceMappingURL=cdek.controller.js.map