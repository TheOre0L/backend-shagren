import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from 'nestjs-prisma';
import { CdekService } from 'src/cdek/cdek.service';
import { PaymentService } from 'src/payment/payment.service';
export declare class OrderService {
    private prisma;
    private readonly cdek;
    private readonly payment;
    constructor(prisma: PrismaService, cdek: CdekService, payment: PaymentService);
    createOrderFromCart(userId: string, body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    getOrders(): Promise<({
        orderItems: ({
            product: {
                id: string;
                title: string;
                images: Prisma.JsonValue[];
                rating: number;
                description: string;
                enabled: boolean;
                price: number;
                oldPrice: number | null;
                longDescription: string;
                discount: number | null;
                reviewCount: number;
                thumbnails: Prisma.JsonValue[];
                categoryid: string;
                typeid: string;
                count: number;
                isNew: boolean;
                isBestseller: boolean;
                sku: string | null;
                deliveryInfo: string | null;
                features: Prisma.JsonValue[];
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
            recipient: Prisma.JsonValue | null;
            toLocation: Prisma.JsonValue | null;
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
    getStats(): Promise<{
        categoryId: string;
        categoryTitle: string;
        totalSales: number;
    }[]>;
}
