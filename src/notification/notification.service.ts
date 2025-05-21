import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.notificationCreateInput, userId: string) {
    await this.prisma.notification.create({ data });
    return this.prisma.notification.findMany({ where: { userId } });
  }

  public async update(
    data: Prisma.notificationUpdateInput,
    id: string,
    userId: string,
  ) {
    await this.prisma.notification.update({
      where: { id, userId },
      data,
    });
    return this.prisma.notification.findMany({ where: { userId } });
  }

  public async delete(id: string, userId: string) {
    await this.prisma.notification.delete({ where: { id, userId } });
    return this.prisma.notification.findMany({ where: { userId } });
  }

  public async getCount(userId: string) {
    const [notificationCount, cart] = await Promise.all([
      this.prisma.notification.count({ where: { userId } }),
      this.prisma.cart.findUnique({
        where: { userId },
        include: {
          _count: {
            select: { cartItems: true },
          },
        },
      }),
    ]);

    const cartItemsCount = cart?._count.cartItems ?? 0;

    return { notificationCount, cartItemsCount };
  }

  public async get(userId: string, page: number, limit: number) {
    const offset = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId: userId },
        take,
        skip: offset,
      }),
      this.prisma.notification.count({ where: { userId: userId } }),
    ]);

    return {
      notifications,
      total,
    };
  }
}
