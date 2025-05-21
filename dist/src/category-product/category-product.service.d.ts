import { Prisma } from '@prisma/client';
import { UUID } from 'crypto';
import { PrismaService } from 'nestjs-prisma';
export declare class CategoryProductService {
    private prisma;
    constructor(prisma: PrismaService);
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
