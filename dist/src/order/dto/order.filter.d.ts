import { UUID } from 'crypto';
import { PaginationFilterDto } from 'src/common/dto/pagination.dto';
export declare class OrderFilterDto extends PaginationFilterDto {
    statusId?: number;
    customerId?: UUID;
    createdFrom?: Date;
    createdTo?: Date;
}
