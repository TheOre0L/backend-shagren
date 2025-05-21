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
exports.TypeProductController = void 0;
const common_1 = require("@nestjs/common");
const type_product_service_1 = require("./type-product.service");
const client_1 = require("@prisma/client");
const dto_1 = require("./dto");
let TypeProductController = class TypeProductController {
    typeProductService;
    constructor(typeProductService) {
        this.typeProductService = typeProductService;
    }
    add(typeProductCreateDto) {
        return this.typeProductService.add(typeProductCreateDto);
    }
    edit(typeId, typeProductUpdateDto) {
        return this.typeProductService.edit(typeId, typeProductUpdateDto);
    }
    remove(typeId) {
        return this.typeProductService.remove(typeId);
    }
    get(filter) {
        return this.typeProductService.get(filter);
    }
};
exports.TypeProductController = TypeProductController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TypeProductController.prototype, "add", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Query)('typeId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TypeProductController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('typeId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeProductController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TypeFilterDto]),
    __metadata("design:returntype", void 0)
], TypeProductController.prototype, "get", null);
exports.TypeProductController = TypeProductController = __decorate([
    (0, common_1.Controller)('type-product'),
    __metadata("design:paramtypes", [type_product_service_1.TypeProductService])
], TypeProductController);
//# sourceMappingURL=type-product.controller.js.map