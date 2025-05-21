/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'nestjs-prisma';
import { FilterProduct } from './dto/product.filter';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductService {
  private logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger('ProductService');
  }

  async create(productCreateDto: Prisma.productCreateInput) {
    const { id, ...rest } = productCreateDto;
    const data = { ...rest, id: randomUUID() };
    const product = await this.prisma.product.create({
      data,
    });
    return {
      product,
      alert: {
        isActive: true,
        title: 'Продукт создан',
        message: `Продукт #${product.id} успешно создан и отображается в катологе`,
        type: 'bg-green-700',
      },
    };
  }

  async edit(productId: string, productUpdateDto: Prisma.productUpdateInput) {
    return await this.prisma.product.update({
      data: productUpdateDto,
      where: { id: productId },
    });
  }

  async delete(productId: string) {
    return await this.prisma.product.delete({ where: { id: productId } });
  }

  async getProducts(filter: FilterProduct) {
    switch (filter.action) {
      case 'findMany': {
        const productsId = filter.productId?.split(',') || []; // Разбиваем строку в массив

        return await this.prisma.product.findMany({
          where: { id: { in: productsId } },
        });
      }

      case 'search': {
        return await this.prisma.product.findMany({
          where: {
            title: {
              contains: filter.query, // Ищет название, содержащее query (регистронезависимо)
              mode: 'insensitive',
            },
          },
          omit: { categoryid: true, materialid: true, typeid: true },
          include: {
            reviews: true,
            material: true,
            category: true,
            type: true,
            colors: true,
          },
        });
      }

      case 'find': {
        return await this.prisma.product.findUnique({
          where: { id: filter.productId },
          omit: { categoryid: true, materialid: true, typeid: true },
          include: {
            reviews: true,
            material: true,
            category: true,
            type: true,
            colors: true,
          },
        });
      }
      case 'all': {
        const offset = (Number(filter.page) - 1) * Number(filter.limit);
        const take = Number(filter.limit);

        console.log('Offset:', offset); // Debug log
        console.log('Take:', take); // Debug log
        // Временно уберите фильтр по цене для проверки
        const where: any = {};
        if (filter.category) {
          where.categoryid = { in: filter.category.split(',') };
        }
        if (filter.color) {
          where.colors = {
            some: { id: { in: filter.color.split(',') } },
          };
        }
        if (filter.minPrice || filter.maxPrice) {
          where.price = {};
          if (filter.minPrice) where.price.gte = Number(filter.minPrice);
          if (filter.maxPrice) where.price.lte = Number(filter.maxPrice);
        }

        if (filter.inStock === true) {
          where.count = { gt: 0 };
        }
        if (filter.isNew === true) {
          where.isNew = true;
        }
        if (filter.isBestseller === true) {
          where.isBestseller = true;
        }

        const orderBy: {
          price?: 'asc' | 'desc';
          rating?: 'desc';
          isNew?: 'desc';
          isBestseller?: 'desc';
        }[] = [];

        if (filter.sort === 'price-asc') {
          orderBy.push({ price: 'asc' });
        } else if (filter.sort === 'price-desc') {
          orderBy.push({ price: 'desc' });
        } else if (filter.sort === 'rating') {
          orderBy.push({ rating: 'desc' });
        } else if (filter.sort === 'new') {
          orderBy.push({ isNew: 'desc' });
        } else {
          orderBy.push({ isBestseller: 'desc' });
        }

        console.log('Where Filters (no price filter):', where); // Debug log

        const [products, total] = await Promise.all([
          this.prisma.product.findMany({
            skip: offset,
            take,
            where,
            orderBy,
            include: {
              material: true,
              category: true,
              type: true,
              colors: true,
            },
          }),
          this.prisma.product.count({ where }),
        ]);

        console.log('Products (no price filter):', products); // Debug log

        const productsColor = await this.prisma.color.findMany({});
        const productCategories = await this.prisma.category.findMany({});
        const productMaterial = await this.prisma.material.findMany({});
        return {
          products,
          categoryes: productCategories,
          colors: productsColor,
          materials: productMaterial,
          total,
        };
      }
    }
  }
}
