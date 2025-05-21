import { ApiProperty } from '@nestjs/swagger';
import { randomUUID, UUID } from 'crypto';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsUUID } from 'class-validator';

import { PaginationFilterDto } from 'src/common/dto/pagination.dto';
import { OrderStatus } from '../types/status';

export class OrderFilterDto extends PaginationFilterDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Фильтр по статусу заказа. Можно указать несколько',
    name: 'statusId',
    enum: OrderStatus,
    example: OrderStatus.Pending,
    format: 'number',
    required: false,
  })
  statusId?: number;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'Фильтр по покупателю',
    name: 'customerId',
    format: 'uuid',
    example: randomUUID(),
    required: false,
  })
  customerId?: UUID;

  @IsDateString()
  @ApiProperty({
    description: 'Фильтр по дате создания. Заказ создан после указаной даты',
    name: 'createdFrom',
    example: new Date(),
    required: false,
  })
  @IsOptional()
  createdFrom?: Date;

  @IsDateString()
  @ApiProperty({
    description: 'Фильтр по дате создания. Заказ создан до указаной даты',
    name: 'createdTo',
    example: new Date(Date.now() + 60 * 60 * 24 * 1000),
    required: false,
  })
  @IsOptional()
  createdTo?: Date;
}
