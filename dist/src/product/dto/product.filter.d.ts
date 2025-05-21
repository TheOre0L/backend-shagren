export declare class FilterProduct {
    action: string;
    query?: string;
    productId?: string;
    page?: number;
    limit?: number;
    category?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    inStock?: boolean | undefined | null;
    isNew?: boolean | undefined | null;
    isBestseller?: boolean | undefined | null;
}
