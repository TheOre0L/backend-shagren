import { Prisma, user } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
export declare class UserService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(user: Prisma.userCreateInput): Promise<{
        id: string;
        password: string;
        email: string;
        fio: string;
        city: string;
        view: boolean;
        role: number;
        telephone: string;
        refreshToken: string | null;
        isActive: boolean;
    }>;
    update(id: string, refreshToken: string | undefined): Promise<user>;
    delete(id: string): Promise<user>;
    findById(id: string): Promise<user>;
    updateUser(id: string, data: any): Promise<user>;
    findByIdWithPas(id: string): Promise<{
        password: string;
        id: string;
    }>;
    findByIdWithCreds(id: string): Promise<user>;
    findByEmail(email: string): Promise<user>;
    findByEmailWithCreds(email: string): Promise<user>;
    findAll(args?: Prisma.userFindManyArgs): Promise<user[]>;
}
