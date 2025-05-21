import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { PaginationFilterDto } from '../../common/dto/pagination.dto';

export class UserFilterDto extends PaginationFilterDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Фильтр по минимальному количеству заказов',
    name: 'minOrdersCount',
    format: 'number',
    required: false,
  })
  minOrdersCount?: number;
}
