import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ReviewsFilterDto, ReviewsResponseDto } from './dto';
import { UUID } from 'crypto';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    add(reviewCreateDto: Prisma.reviewCreateInput, productId: string, id: string): Promise<ReviewsResponseDto>;
    edit(reviewUpdateDto: Prisma.reviewUpdateInput): Promise<ReviewsResponseDto>;
    remove(reviewId: UUID): Promise<any>;
    get(filter: ReviewsFilterDto): Promise<{
        reviews: {
            id: string;
            userId: string | null;
            date: Date;
            text: string;
            productId: string;
            author: string;
            images: Prisma.JsonValue[];
            rating: number;
            isVerified: boolean;
            isHomePage: boolean;
        }[];
        total: number;
    }>;
}
