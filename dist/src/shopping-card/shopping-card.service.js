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
exports.ShoppingCardService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let ShoppingCardService = class ShoppingCardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addProductToCart(userId, productId, quantity) {
        let cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: {
                    user: { connect: { id: userId } },
                    cartItems: { create: [] },
                },
            });
        }
        const existingItem = await this.prisma.cartItem.findFirst({
            where: { cartId: cart.id, productId },
        });
        if (existingItem) {
            return this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        }
        return this.prisma.cartItem.create({
            data: {
                cart: { connect: { id: cart.id } },
                product: { connect: { id: productId } },
                quantity,
            },
        });
    }
    async removeProductFromCart(userId, productId) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: { cartItems: true },
        });
        if (!cart) {
            throw new common_1.NotFoundException('Корзина не найдена');
        }
        const item = cart.cartItems.find((item) => item.productId === productId);
        if (!item) {
            throw new common_1.NotFoundException('Товар не найден в корзине');
        }
        await this.prisma.cartItem.delete({ where: { id: item.id } });
        return { message: 'Товар удалён из корзины' };
    }
    async getCart(userId) {
        return await this.prisma.cart.findUnique({
            where: { userId },
            include: { cartItems: { include: { product: true } } },
        });
    }
    async clearCart(userId) {
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            throw new common_1.NotFoundException('Корзина не найдена');
        }
        await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        return { message: 'Корзина очищена' };
    }
};
exports.ShoppingCardService = ShoppingCardService;
exports.ShoppingCardService = ShoppingCardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ShoppingCardService);
//# sourceMappingURL=shopping-card.service.js.map