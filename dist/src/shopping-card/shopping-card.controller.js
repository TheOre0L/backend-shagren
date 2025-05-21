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
let ShoppingCartController = class ShoppingCartController {
    shoppingCartService;
    constructor(shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
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
exports.ShoppingCartController = ShoppingCartController = __decorate([
    (0, common_1.Controller)('shopping-cart'),
    __metadata("design:paramtypes", [shopping_card_service_1.ShoppingCardService])
], ShoppingCartController);
//# sourceMappingURL=shopping-card.controller.js.map