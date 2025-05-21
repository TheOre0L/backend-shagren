import { ReviewsService } from './reviews.service';
import { Prisma } from '@prisma/client';
import { ReviewsFilterDto } from './dto';
import { UUID } from 'crypto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    add(reviewCreateDto: Prisma.reviewCreateInput, productId: string, req: Request & {
        user: {
            userId: string;
        };
    }): Promise<import("./dto").ReviewsResponseDto>;
    edit(reviewUpdateDto: Prisma.reviewUpdateInput): Promise<import("./dto").ReviewsResponseDto>;
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
