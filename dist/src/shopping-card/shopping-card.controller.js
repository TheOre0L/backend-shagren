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
exports.ShoppingCartController = void 0;
const common_1 = require("@nestjs/common");
const shopping_card_service_1 = require("./shopping-card.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const nestjs_prisma_1 = require("nestjs-prisma");
let ShoppingCartController = class ShoppingCartController {
    shoppingCartService;
    prisma;
    constructor(shoppingCartService, prisma) {
        this.shoppingCartService = shoppingCartService;
        this.prisma = prisma;
    }
    addItem(req, productId, quantity = 1) {
        return this.shoppingCartService.addProductToCart(req.user.userId, productId, quantity);
    }
    removeItem(req, productId) {
        return this.shoppingCartService.removeProductFromCart(req.user.userId, productId);
    }
    getCart(req) {
        return this.shoppingCartService.getCart(req.user.userId);
    }
    clearCart(req) {
        return this.shoppingCartService.clearCart(req.user.userId);
    }
    async incDec(req, id, count) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId: req.user.userId },
        });
        if (!cart) {
            throw new Error('Cart not found');
        }
        if (count === 0) {
            await this.prisma.cartItem.deleteMany({
                where: {
                    cartId: cart.id,
                    productId: id,
                },
            });
        }
        await this.prisma.cartItem.updateMany({
            where: {
                cartId: cart.id,
                productId: id,
            },
            data: {
                quantity: count,
            },
        });
        return await this.prisma.cart.findUnique({
            where: { userId: req.user.userId },
            include: { cartItems: { include: { product: true } } },
        });
    }
};
exports.ShoppingCartController = ShoppingCartController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AccessTokenGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('productId')),
    __param(2, (0, common_1.Body)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AccessTokenGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AccessTokenGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AccessTokenGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShoppingCartController.prototype, "clearCart", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AccessTokenGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('item')),
    __param(2, (0, common_1.Query)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], ShoppingCartController.prototype, "incDec", null);
exports.ShoppingCartController = ShoppingCartController = __decorate([
    (0, common_1.Controller)('shopping-cart'),
    __metadata("design:paramtypes", [shopping_card_service_1.ShoppingCardService,
        nestjs_prisma_1.PrismaService])
], ShoppingCartController);
//# sourceMappingURL=shopping-card.controller.js.map