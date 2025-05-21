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
exports.CategoryProductController = void 0;
const common_1 = require("@nestjs/common");
const category_product_service_1 = require("./category-product.service");
const client_1 = require("@prisma/client");
let CategoryProductController = class CategoryProductController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    add(categoryProductCreateDto) {
        return this.categoryService.add(categoryProductCreateDto);
    }
    edit(categoryId, categoryProductUpdateDto) {
        return this.categoryService.edit(categoryId, categoryProductUpdateDto);
    }
    remove(categoryId) {
        return this.categoryService.remove(categoryId);
    }
    get(action, categoryId) {
        return this.categoryService.get(action, categoryId);
    }
};
exports.CategoryProductController = CategoryProductController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoryProductController.prototype, "add", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Query)('categoryId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CategoryProductController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('categoryId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryProductController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Query)('categoryId', new common_1.ParseUUIDPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryProductController.prototype, "get", null);
exports.CategoryProductController = CategoryProductController = __decorate([
    (0, common_1.Controller)('category-product'),
    __metadata("design:paramtypes", [category_product_service_1.CategoryProductService])
], CategoryProductController);
//# sourceMappingURL=category-product.controller.js.map