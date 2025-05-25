import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
export declare class NotificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.notificationCreateInput, userId: string): Promise<{
        id: string;
        userId: string;
        link: string;
        type: string;
        date: Date;
        text: string;
        status: string;
        orderId: string | null;
        productId: string | null;
        title: string | null;
    }[]>;
    update(data: Prisma.notificationUpdateInput, id: string, userId: string): Promise<{
        id: string;
        userId: string;
        link: string;
        type: string;
        date: Date;
        text: string;
        status: string;
        orderId: string | null;
        productId: string | null;
        title: string | null;
    }[]>;
    delete(userId: string, id?: string): Promise<{
        id: string;
        userId: string;
        link: string;
        type: string;
        date: Date;
        text: string;
        status: string;
        orderId: string | null;
        productId: string | null;
        title: string | null;
    }[]>;
    getCount(userId: string): Promise<{
        notificationCount: number;
        cartItemsCount: number;
    }>;
    get(userId: string, page: number, limit: number): Promise<{
        notifications: {
            id: string;
            userId: string;
            link: string;
            type: string;
            date: Date;
            text: string;
            status: string;
            orderId: string | null;
            productId: string | null;
            title: string | null;
        }[];
        total: number;
    }>;
}
