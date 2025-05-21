/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UUID } from 'crypto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CategoryProductService {
  constructor(private prisma: PrismaService) {}

  async add(
    categoryProductCreateDto: Prisma.categoryCreateInput,
  ): Promise<{ id: string; title: string }> {
    return await this.prisma.category.create({
      data: categoryProductCreateDto,
    });
  }

  async edit(
    categoryId: UUID,
    categoryProductUpdateDto: Prisma.categoryUpdateInput,
  ): Promise<{ id: string; title: string }> {
    try {
      return await this.prisma.category.update({
        data: categoryProductUpdateDto,
        where: { id: categoryId },
      });
    } catch (e) {
      console.error(e);
      throw new NotFoundException('Тип не найден');
    }
  }

  async remove(categoryId: UUID): Promise<{ id: string; title: string }> {
    try {
      return await this.prisma.category.delete({
        where: { id: categoryId },
      });
    } catch (e) {
      console.error(e);
      throw new NotFoundException('Тип не найден');
    }
  }

  async get(action: 'all' | 'one', categoryId?: UUID) {
    switch (action) {
      case 'all': {
        return await this.prisma.category.findMany();
      }
      case 'one': {
        const categoryes = await this.prisma.category.findUnique({
          where: { id: categoryId },
        });
        if (!categoryes) {
          throw new NotFoundException('Категория не найдена');
        }
        return categoryes;
      }
      default: {
        throw new BadRequestException('Неизвестное действие');
      }
    }
  }
}
