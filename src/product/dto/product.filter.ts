import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterProduct {
  @IsString()
  action: string;

  @IsString()
  @IsOptional()
  query?: string;

  @IsOptional() // если productId может быть пустым
  productId?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : value)) // Transform string to number
  page?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : value)) // Transform string to number
  limit?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : value)) // Transform string to number
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : value)) // Transform string to number
  maxPrice?: number;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  inStock?: boolean | undefined | null;

  @IsOptional()
  isNew?: boolean | undefined | null;

  @IsOptional()
  isBestseller?: boolean | undefined | null;
}
