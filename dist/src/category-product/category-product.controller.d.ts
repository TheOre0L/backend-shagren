import { CategoryProductService } from './category-product.service';
import { UUID } from 'crypto';
import { Prisma } from '@prisma/client';
export declare class CategoryProductController {
    private readonly categoryService;
    constructor(categoryService: CategoryProductService);
    add(categoryProductCreateDto: Prisma.categoryCreateInput): Promise<{
        id: string;
        title: string;
    }>;
    edit(categoryId: UUID, categoryProductUpdateDto: Prisma.categoryUpdateInput): Promise<{
        id: string;
        title: string;
    }>;
    remove(categoryId: UUID): Promise<{
        id: string;
        title: string;
    }>;
    get(action: 'all' | 'one', categoryId?: UUID): Promise<{
        id: string;
        title: string;
    } | {
        id: string;
        title: string;
    }[]>;
}
