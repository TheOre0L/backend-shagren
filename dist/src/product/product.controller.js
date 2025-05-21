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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const client_1 = require("@prisma/client");
const nestjs_prisma_1 = require("nestjs-prisma");
const product_filter_1 = require("./dto/product.filter");
let ProductController = class ProductController {
    productService;
    prisma;
    constructor(productService, prisma) {
        this.productService = productService;
        this.prisma = prisma;
    }
    create(productCreateDto) {
        return this.productService.create(productCreateDto);
    }
    edit(productId, productEditDto) {
        return this.productService.edit(productId, productEditDto);
    }
    viewProduct(productId) {
        return this.productService.delete(productId);
    }
    getProducts(filter) {
        return this.productService.getProducts(filter);
    }
    colorCreate(colorCreateDTO) {
        return this.prisma.color.create({ data: colorCreateDTO });
    }
    colorGet() {
        return this.prisma.color.findMany();
    }
    materialGet() {
        return this.prisma.material.findMany();
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Query)('productId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('productId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "viewProduct", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_filter_1.FilterProduct]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Post)('color'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "colorCreate", null);
__decorate([
    (0, common_1.Get)('color'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "colorGet", null);
__decorate([
    (0, common_1.Get)('material'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "materialGet", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        nestjs_prisma_1.PrismaService])
], ProductController);
//# sourceMappingURL=product.controller.js.map