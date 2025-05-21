import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { TypeFilterDto, TypeResponseDto } from './dto';
import { UUID } from 'crypto';
export declare class TypeProductService {
    private prisma;
    constructor(prisma: PrismaService);
    add(typeProductCreateDto: Prisma.typeCreateInput): Promise<TypeResponseDto>;
    edit(typeId: UUID, typeProductUpdateDto: Prisma.typeUpdateInput): Promise<TypeResponseDto>;
    remove(typeId: UUID): Promise<TypeResponseDto>;
    get(filter: TypeFilterDto): Promise<{
        id: string;
        name: string;
        categoryid: string | null;
    }[]>;
}
