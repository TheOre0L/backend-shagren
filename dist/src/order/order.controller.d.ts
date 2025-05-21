import { OrderService } from './order.service';
import { UUID } from 'crypto';
import { Response } from 'express';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    checkout(req: Request & {
        user: {
            userId: UUID;
        };
    }, res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    getOrders(req: Request & {
        user: {
            userId: UUID;
        };
    }): Promise<({
        orderItems: ({
            product: {
                id: string;
                title: string;
                images: import("@prisma/client/runtime/library").JsonValue[];
                rating: number;
                description: string;
                enabled: boolean;
                price: number;
                oldPrice: number | null;
                longDescription: string;
                discount: number | null;
                reviewCount: number;
                thumbnails: import("@prisma/client/runtime/library").JsonValue[];
                categoryid: string;
                typeid: string;
                count: number;
                isNew: boolean;
                isBestseller: boolean;
                sku: string | null;
                deliveryInfo: string | null;
                features: import("@prisma/client/runtime/library").JsonValue[];
                dimensions: string | null;
                weight: string | null;
                relatedProducts: string[];
                materialid: string;
            };
        } & {
            id: string;
            orderId: string;
            productId: string;
            quantity: number;
        })[];
        payment: {
            id: string;
            data: Date | null;
            status: string;
            createdAt: Date;
            description: string;
            value: string;
            currency: string;
            yooKassaId: string;
            updatedAt: Date;
        } | null;
        delivery: {
            id: string;
            city: string | null;
            type: string;
            createdAt: Date;
            updatedAt: Date;
            deliveryServiceId: string;
            deliverySum: number;
            tariffCode: number | null;
            recipient: import("@prisma/client/runtime/library").JsonValue | null;
            toLocation: import("@prisma/client/runtime/library").JsonValue | null;
        } | null;
    } & {
        id: string;
        fio: string | null;
        userId: string;
        status: string | null;
        phone: string | null;
        summa: number;
        createdAt: Date;
        paymentId: string | null;
        deliveryId: string | null;
    })[]>;
    cancelOrder(orderId: string): Promise<{
        id: string;
        fio: string | null;
        userId: string;
        status: string | null;
        phone: string | null;
        summa: number;
        createdAt: Date;
        paymentId: string | null;
        deliveryId: string | null;
    }>;
    stats(): Promise<{
        categoryId: string;
        categoryTitle: string;
        totalSales: number;
    }[]>;
}
