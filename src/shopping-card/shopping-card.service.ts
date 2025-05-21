/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ShoppingCardService {
  constructor(private readonly prisma: PrismaService) {}

  // Добавление товара в корзину
  async addProductToCart(userId: string, productId: string, quantity: number) {
    // Находим корзину пользователя
    let cart = await this.prisma.cart.findUnique({ where: { userId } });

    // Если корзины нет, создаем её
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
          cartItems: { create: [] },
        },
      });
    }

    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      // Обновляем количество, если товар уже в корзине
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    // Добавляем новый товар в корзину
    return this.prisma.cartItem.create({
      data: {
        cart: { connect: { id: cart.id } },
        product: { connect: { id: productId } },
        quantity,
      },
    });
  }

  // Удаление товара из корзины
  async removeProductFromCart(userId: string, productId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: true },
    });

    if (!cart) {
      throw new NotFoundException('Корзина не найдена');
    }

    const item = cart.cartItems.find((item) => item.productId === productId);

    if (!item) {
      throw new NotFoundException('Товар не найден в корзине');
    }

    await this.prisma.cartItem.delete({ where: { id: item.id } });

    return { message: 'Товар удалён из корзины' };
  }

  // Получение корзины пользователя
  async getCart(userId: string) {
    return await this.prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: { include: { product: true } } },
    });
  }

  // Очистка корзины
  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      throw new NotFoundException('Корзина не найдена');
    }

    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return { message: 'Корзина очищена' };
  }
}
