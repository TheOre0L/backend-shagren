import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { FilterProduct } from './dto/product.filter';
import { UUID } from 'crypto';
export declare class ProductController {
    private readonly productService;
    private prisma;
    constructor(productService: ProductService, prisma: PrismaService);
    create(productCreateDto: Prisma.productCreateInput): Promise<{
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
        alert: {
            isActive: boolean;
            title: string;
            message: string;
            type: string;
        };
    }>;
    edit(productId: string, productEditDto: Prisma.productUpdateInput): Promise<{
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
    }>;
    viewProduct(productId: string): Promise<{
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
    }>;
    getProducts(filter: FilterProduct): Promise<{
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
    }[] | ({
        type: {
            id: string;
            name: string;
            categoryid: string | null;
        };
        colors: {
            id: string;
            name: string;
            rgb: string;
        }[];
        reviews: {
            id: string;
            userId: string | null;
            date: Date;
            text: string;
            productId: string;
            author: string;
            images: Prisma.JsonValue[];
            rating: number;
            isVerified: boolean;
            isHomePage: boolean;
        }[];
        material: {
            id: string;
            name: string;
            enabled: boolean;
        };
        category: {
            id: string;
            title: string;
        };
    } & {
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
        count: number;
        isNew: boolean;
        isBestseller: boolean;
        sku: string | null;
        deliveryInfo: string | null;
        features: Prisma.JsonValue[];
        dimensions: string | null;
        weight: string | null;
        relatedProducts: string[];
    })[] | ({
        type: {
            id: string;
            name: string;
            categoryid: string | null;
        };
        colors: {
            id: string;
            name: string;
            rgb: string;
        }[];
        reviews: {
            id: string;
            userId: string | null;
            date: Date;
            text: string;
            productId: string;
            author: string;
            images: Prisma.JsonValue[];
            rating: number;
            isVerified: boolean;
            isHomePage: boolean;
        }[];
        material: {
            id: string;
            name: string;
            enabled: boolean;
        };
        category: {
            id: string;
            title: string;
        };
    } & {
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
        count: number;
        isNew: boolean;
        isBestseller: boolean;
        sku: string | null;
        deliveryInfo: string | null;
        features: Prisma.JsonValue[];
        dimensions: string | null;
        weight: string | null;
        relatedProducts: string[];
    }) | {
        products: ({
            type: {
                id: string;
                name: string;
                categoryid: string | null;
            };
            colors: {
                id: string;
                name: string;
                rgb: string;
            }[];
            material: {
                id: string;
                name: string;
                enabled: boolean;
            };
            category: {
                id: string;
                title: string;
            };
        } & {
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
        })[];
        categoryes: {
            id: string;
            title: string;
        }[];
        colors: {
            id: string;
            name: string;
            rgb: string;
        }[];
        materials: {
            id: string;
            name: string;
            enabled: boolean;
        }[];
        total: number;
    } | null | undefined>;
    colorCreate(colorCreateDTO: Prisma.ColorCreateInput): Prisma.Prisma__ColorClient<{
        id: string;
        name: string;
        rgb: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    colorEdit(colorCreateDTO: {
        name: string;
        rgb: string;
    }, id: UUID): Prisma.Prisma__ColorClient<{
        id: string;
        name: string;
        rgb: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    colorGet(): Prisma.PrismaPromise<{
        id: string;
        name: string;
        rgb: string;
    }[]>;
    materialGet(): Prisma.PrismaPromise<{
        id: string;
        name: string;
        enabled: boolean;
    }[]>;
    materialPost(data: {
        name: string;
        enabled: boolean;
    }): Prisma.Prisma__MaterialClient<{
        id: string;
        name: string;
        enabled: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    materialEdit(data: {
        name: string;
        enabled: boolean;
    }, materialId: UUID): Prisma.Prisma__MaterialClient<{
        id: string;
        name: string;
        enabled: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
