import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Prisma, user } from '@prisma/client';

import { PrismaService } from 'nestjs-prisma';
import { isStrongPassword } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(user: Prisma.userCreateInput) {
    const userExists = await this.prismaService.user.findFirst({
      where: {
        email: user.email,
        telephone: user.telephone,
      },
    });

    if (userExists) {
      throw new BadRequestException('Такой пользователь уже существует');
    }

    // // TODO: проверка должна быть на уровне интерфейсов?
    // if (!isStrongPassword(user.password)) {
    //   throw new BadRequestException('Пароль слишком слабый');
    // }

    user.password = await argon2.hash(user.password);
    const newUser = await this.prismaService.user.create({ data: user });

    return newUser;
  }

  async update(id: string, refreshToken: string | undefined): Promise<user> {
    const user = await this.findById(id); // Проверка, что пользователь существует
    if (!user) throw new Error('User not found');

    const update = await this.prismaService.user.update({
      where: { id },
      data: { refreshToken: refreshToken },
    });

    console.table(update);
    console.log('----------updateUser--------------', id, refreshToken);
    return update;
  }

  async delete(id: string): Promise<user> {
    await this.findById(id);
    return await this.prismaService.user.delete({ where: { id } });
  }

  async findById(id: string): Promise<user> {
    const findUser = await this.prismaService.user.findFirstOrThrow({
      where: { id },
      include: {
        order: {
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
        },
        cart: {
          include: {
            cartItems: {
              include: {
                product: true,
              },
            },
          },
        },
        review: true,
      },
    });

    return findUser;
  }

  async findByIdWithCreds(id: string): Promise<user> {
    const findUser = await this.prismaService.user.findFirstOrThrow({
      where: { id: id },
      omit: {
        password: false,
        refreshToken: false,
      },
    });

    return findUser;
  }

  async findByEmail(email: string): Promise<user> {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: { email },
    });

    return user;
  }

  async findByEmailWithCreds(email: string): Promise<user> {
    const findUser = await this.prismaService.user.findFirstOrThrow({
      where: { email },
      omit: {
        password: false,
        refreshToken: false,
      },
    });

    return findUser;
  }

  async findAll(
    args: Prisma.userFindManyArgs = {
      where: {},
      skip: 0,
      take: 50,
    },
  ): Promise<user[]> {
    return this.prismaService.user.findMany(args);
  }

  // FIX: Нужно добавить связь в с таблицей заказ и шаблон
  // async findMany(
  //   filter: UserFilterDto,
  // ): Promise<{ users: UserResponseDto[]; total: number }> {}
}
