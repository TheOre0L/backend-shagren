import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
export declare class ShoppingCardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    addProductToCart(userId: string, productId: string, quantity: number): Promise<{
        id: string;
        productId: string;
        cartId: string;
        quantity: number;
    }>;
    removeProductFromCart(userId: string, productId: string): Promise<{
        message: string;
    }>;
    getCart(userId: string): Promise<({
        cartItems: ({
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
            productId: string;
            cartId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        userId: string;
    }) | null>;
    clearCart(userId: string): Promise<{
        message: string;
    }>;
}
