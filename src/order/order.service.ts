/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

import { PrismaService } from 'nestjs-prisma';
import { CdekService } from 'src/cdek/cdek.service';
import { NotificationService } from 'src/notification/notification.service';
import { CurrencyEnum, PaymentMethodsEnum } from 'src/payment/external';
import { PaymentService } from 'src/payment/payment.service';
import { OrderStatus, OrderStatusTitles } from './types/status';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private readonly cdek: CdekService,
    private readonly payment: PaymentService,
    private readonly notification: NotificationService,
  ) {}

  // Создать заказ из корзины
  async createOrderFromCart(userId: string, body: any, res: Response) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { userId },
        include: { cartItems: true },
      });

      if (!cart || cart.cartItems.length === 0) {
        return res
          .status(400)
          .json({ message: 'Корзина пуста или не найдена' });
      }

      // Подсчет суммы заказа
      const totalSum = await cart.cartItems.reduce(
        async (totalPromise, item) => {
          const total = await totalPromise;
          const product = await this.prisma.product.findUnique({
            where: { id: item.productId },
            select: { price: true },
          });

          return product ? total + product.price * item.quantity : total;
        },
        Promise.resolve(0),
      );

      let order = await this.prisma.order.create({
        data: {
          userId,
          fio: `${body.firstName} ${body.lastName}`,
          phone: body.phone,
          summa: totalSum,
          orderItems: {
            create: cart.cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      });
      await Promise.all(
        cart.cartItems.map((item) =>
          this.prisma.product.update({
            where: { id: item.productId },
            data: {
              count: {
                decrement: item.quantity,
              },
            },
          }),
        ),
      );
      // Оплата
      const paymentA = await this.payment.createPayment({
        amount: {
          value: totalSum + body.rate.delivery_sum,
          currency: CurrencyEnum.RUB,
        },
        description: `Оплата заказа №${order.id}, пользователь ${userId}`,
        payment_method_data: { type: PaymentMethodsEnum.yoo_money },
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: 'https://shagren.shop/thank',
        },
        metadata: { order_id: order.id },
      });

      const paydb = await this.prisma.payment.create({
        data: {
          value: `${paymentA.amount.value}`,
          currency: paymentA.amount.currency,
          status: 'succeeded',
          yooKassaId: paymentA.id,
          description: paymentA.description,
        },
      });

      // Доставка
      const items = cart.cartItems.map((item) => ({
        name: `Товар ${item.productId}`,
        ware_key: item.productId,
        quantity: item.quantity,
        price: totalSum / cart.cartItems.length,
        weight: item.quantity * 1000,
        amount: item.quantity,
        cost: (totalSum / cart.cartItems.length) * item.quantity,
        payment: { value: 0 },
      }));

      const deliveryData = {
        type: 1,
        number: order.id,
        tariff_code: body.rate.tariff_code,
        sender: {
          company: 'ИП ШАГРЕНЬ',
          name: 'Куценко Яков',
          phones: [{ number: '+79197595502' }],
        },
        recipient: {
          name: `${body.firstName} ${body.lastName}`,
          phones: [{ number: `${body.phone}` }],
        },
        from_location: { code: 1079, address: 'ул. Краснопартизанская, д. 5' },
        to_location: {
          code: body.address.city_code,
          address: body.address.address,
        },
        packages: [
          {
            number: items[0].name,
            weight: 1000,
            items: items,
          },
        ],
      };

      const delivery = await this.cdek.orderProcess(
        'create',
        deliveryData,
        res,
      );

      const deliverydb = await this.prisma.delivery.create({
        data: {
          type: 'cdek',
          deliveryServiceId: delivery?.data.entity?.uuid || '',
          deliverySum: body.rate.delivery_sum,
          city: body.address.city,
          tariffCode: body.rate.tariff_code,
          recipient: deliveryData.recipient,
          toLocation: deliveryData.to_location,
        },
      });

      // Обновляем заказ с ID оплаты и доставки
      order = await this.prisma.order.update({
        where: { id: order.id },
        data: {
          deliveryId: deliverydb.id,
          paymentId: paydb.id,
          summa: order.summa + deliverydb.deliverySum,
        },
      });

      if (!order.paymentId || !order.deliveryId) {
        await this.prisma.order.delete({ where: { id: order.id } });
        return res.status(500).json({ message: 'Ошибка создания заказа' });
      }

      // Очистка корзины
      await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

      console.log('Заказ успешно создан:', order, paymentA);
      return res.status(200).json({ order, payment: paymentA });
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Получить заказы пользователя
  async getOrders() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' }, // Сортируем от новых к старым
      include: {
        delivery: true,
        payment: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  // Отменить заказ
  async updateOrder(orderId: string, status: string) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: status },
      include: { orderItems: { include: { product: true } } },
    });
    if (status === 'delivered') {
      for (const item of order.orderItems) {
        await this.notification.create(
          {
            text: `Статус заказа #${orderId} с товаром "${item.product.title}" был доставлен, оцените его! Получите его в ПВЗ.`,
            link: `https://shagren.shop/review/${item.productId}`,
            title: 'Заказ доставлен!',
            date: new Date(),
            user: {
              connect: { id: order.userId },
            },
          },
          order.userId,
        );
      }
    }

    return await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' }, // Сортируем от новых к старым
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        payment: true,
        delivery: true,
      },
    });
  }

  async cancelOrder(orderId: string) {
    const order = await this.prisma.order.findFirstOrThrow({
      where: { id: orderId },
      include: { payment: true, delivery: true },
    });

    const payment = order.payment;

    if (payment) {
      await this.payment.refundPayment({
        payment_id: payment.yooKassaId,
        description: `Возврат денег за отмену заказа #${orderId}`,
      });
    }

    await this.notification.create(
      {
        text: `Заказ #${orderId} был отменен! Деньги были возвращены.`,
        link: 'https://shagren.shop/profile',
        title: 'Заказ отменён!',
        date: new Date(),
        user: {
          connect: {
            id: order.userId,
          },
        },
      },
      order.userId,
    );

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'cancelled' },
    });
  }

  async getStats() {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      // Получаем заказы за последний месяц
      const orders = await this.prisma.order.findMany({
        where: {
          createdAt: {
            gte: oneMonthAgo,
          },
        },
        select: {
          id: true,
          summa: true,
          orderItems: {
            select: {
              productId: true,
              quantity: true,
            },
          },
        },
      });

      const totalRevenue = orders.reduce(
        (sum, order) => sum + Number(order.summa),
        0,
      );
      const totalOrders = orders.length;
      const averageCheck = totalOrders === 0 ? 0 : totalRevenue / totalOrders;

      // Статистика по категориям за последний месяц
      const categories = await this.prisma.category.findMany({
        select: {
          id: true,
          title: true,
          product: {
            select: {
              id: true,
              title: true,
              orderItems: {
                where: {
                  order: {
                    createdAt: {
                      gte: oneMonthAgo,
                    },
                  },
                },
                select: {
                  quantity: true,
                },
              },
            },
          },
        },
      });

      const categoryStats = categories.map((category) => {
        const totalSales = category.product.reduce((sum, product) => {
          const productSales = product.orderItems.reduce(
            (acc, item) => acc + item.quantity,
            0,
          );
          return sum + productSales;
        }, 0);

        return {
          categoryId: category.id,
          categoryTitle: category.title,
          totalSales,
        };
      });

      return {
        totalRevenue,
        totalOrders,
        averageCheck,
        result: categoryStats,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Ошибка при получении статистики');
    }
  }
}
