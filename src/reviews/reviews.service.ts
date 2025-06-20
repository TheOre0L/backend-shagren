/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ReviewsFilterDto, ReviewsResponseDto } from './dto';
import { UUID } from 'crypto';
import { Request } from 'express';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async add(
    reviewCreateDto: Prisma.reviewCreateInput,
    productId: string,
    id: string,
  ): Promise<ReviewsResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      const data: any = {
        ...reviewCreateDto,
        author: user?.fio || 'Аноним',
        date: new Date().toISOString(),
        userId: id,
      };

      // Создаём отзыв
      const review = await this.prisma.review.create({ data });

      // Обновляем рейтинг и количество отзывов продукта
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
        select: { rating: true, reviewCount: true },
      });

      if (product) {
        const newReviewCount = (product.reviewCount || 0) + 1;
        const newRating =
          ((product.rating || 0) * product.reviewCount +
            reviewCreateDto.rating) /
          newReviewCount;

        await this.prisma.product.update({
          where: { id: productId },
          data: {
            rating: newRating,
            reviewCount: newReviewCount,
          },
        });
      }

      return review as any;
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Произошла ошибка');
    }
  }

  async edit(
    reviewUpdateDto: Prisma.reviewUpdateInput,
  ): Promise<ReviewsResponseDto> {
    const { id, ...data } = reviewUpdateDto;
    if (!id || typeof id !== 'string') {
      throw new NotFoundException('Такой отзыв не найден');
    }
    const updatedReview = await this.prisma.review.update({
      data,
      where: { id },
    });
    return updatedReview as any;
  }

  async remove(reviewId: UUID) {
    if (!reviewId || typeof reviewId !== 'string') {
      throw new NotFoundException('Такой отзыв не найден');
    }
    const removedReview = await this.prisma.review.delete({
      where: { id: reviewId },
    });
    return removedReview as any;
  }

  async get(filter: ReviewsFilterDto) {
    const { productId, page = 1, limit = 10 } = filter;
    const offset = (page - 1) * limit;

    const where: Prisma.reviewWhereInput = {};
    if (productId && typeof productId === 'string') {
      where.productId = productId;
    }

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip: offset,
        take: limit,
      }),
      this.prisma.review.count({ where }),
    ]);

    return {
      reviews,
      total,
    };
  }
}
