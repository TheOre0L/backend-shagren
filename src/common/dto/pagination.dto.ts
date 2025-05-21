/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto<TData> {
  data: TData[];

  @ApiProperty({
    description: 'Всего элементов',
  })
  @IsOptional()
  total: number;

  @ApiProperty({
    description: 'Лимит. Максимум 100',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number;

  @ApiProperty({
    description: 'Номер страницы',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  @Min(1)
  page: number;
}

export class PaginationFilterDto {
  @ApiProperty({
    description: 'Номер страницы',
    required: true,
    default: 1,
    example: 1,
  })
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    description: 'Количество элементов на странице',
    required: true,
    default: 10,
    example: 10,
  })
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsNumber()
  @Min(1)
  limit: number = 10;
}
