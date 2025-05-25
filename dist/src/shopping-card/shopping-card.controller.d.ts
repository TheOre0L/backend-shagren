import { ShoppingCardService } from './shopping-card.service';
import { UUID } from 'crypto';
import { PrismaService } from 'nestjs-prisma';
export declare class ShoppingCartController {
    private readonly shoppingCartService;
    private prisma;
    constructor(shoppingCartService: ShoppingCardService, prisma: PrismaService);
    addItem(req: Request & {
        user: {
            userId: UUID;
        };
    }, productId: string, quantity?: number): Promise<{
        id: string;
        productId: string;
        cartId: string;
        quantity: number;
    }>;
    removeItem(req: Request & {
        user: {
            userId: UUID;
        };
    }, productId: string): Promise<{
        message: string;
    }>;
    getCart(req: Request & {
        user: {
            userId: UUID;
        };
    }): Promise<({
        cartItems: ({
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
            productId: string;
            cartId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        userId: string;
    }) | null>;
    clearCart(req: Request & {
        user: {
            userId: UUID;
        };
    }): Promise<{
        message: string;
    }>;
    incDec(req: Request & {
        user: {
            userId: UUID;
        };
    }, id: string, count: number): Promise<({
        cartItems: ({
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
            productId: string;
            cartId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        userId: string;
    }) | null>;
}
