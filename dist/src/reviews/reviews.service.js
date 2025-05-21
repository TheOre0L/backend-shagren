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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async add(reviewCreateDto, productId, id) {
        try {
            const user = await this.prisma.user.findUnique({ where: { id } });
            const data = {
                ...reviewCreateDto,
                author: user?.fio || 'Аноним',
                date: new Date().toISOString(),
            };
            const review = await this.prisma.review.create({ data });
            const product = await this.prisma.product.findUnique({
                where: { id: productId },
                select: { rating: true, reviewCount: true },
            });
            if (product) {
                const newReviewCount = (product.reviewCount || 0) + 1;
                const newRating = ((product.rating || 0) * product.reviewCount +
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
            return review;
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException('Произошла ошибка');
        }
    }
    async edit(reviewUpdateDto) {
        const { id, ...data } = reviewUpdateDto;
        if (!id || typeof id !== 'string') {
            throw new common_1.NotFoundException('Такой отзыв не найден');
        }
        const updatedReview = await this.prisma.review.update({
            data,
            where: { id },
        });
        return updatedReview;
    }
    async remove(reviewId) {
        if (!reviewId || typeof reviewId !== 'string') {
            throw new common_1.NotFoundException('Такой отзыв не найден');
        }
        const removedReview = await this.prisma.review.delete({
            where: { id: reviewId },
        });
        return removedReview;
    }
    async get(filter) {
        const { productId, page, limit } = filter;
        if (!productId || typeof productId !== 'string') {
            throw new common_1.NotFoundException('У этого товара отсутвуют отзывы или товар не существует');
        }
        const offset = (page - 1) * limit;
        const [reviews, total] = await Promise.all([
            await this.prisma.review.findMany({
                where: { productId },
                skip: offset,
                take: limit,
            }),
            this.prisma.review.count({ where: { productId } }),
        ]);
        return {
            reviews,
            total,
        };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map