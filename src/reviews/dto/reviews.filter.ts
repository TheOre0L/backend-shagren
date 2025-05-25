import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ReviewsFilterDto {
  @IsOptional()
  productId?: string;

  @Type(() => Number)
  @IsNumber()
  page: number;

  @Type(() => Number)
  @IsNumber()
  limit: number;
}
