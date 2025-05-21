import { TypeProductService } from './type-product.service';
import { Prisma } from '@prisma/client';
import { TypeFilterDto } from './dto';
import { UUID } from 'crypto';
export declare class TypeProductController {
    private readonly typeProductService;
    constructor(typeProductService: TypeProductService);
    add(typeProductCreateDto: Prisma.typeCreateInput): Promise<import("./dto").TypeResponseDto>;
    edit(typeId: UUID, typeProductUpdateDto: Prisma.typeUpdateInput): Promise<import("./dto").TypeResponseDto>;
    remove(typeId: UUID): Promise<import("./dto").TypeResponseDto>;
    get(filter: TypeFilterDto): Promise<{
        id: string;
        name: string;
        categoryid: string | null;
    }[]>;
}
