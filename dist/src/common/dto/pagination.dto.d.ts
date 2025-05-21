export declare class PaginationDto<TData> {
    data: TData[];
    total: number;
    limit: number;
    page: number;
}
export declare class PaginationFilterDto {
    page: number;
    limit: number;
}
