import { Module } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CategoryProductController } from './category-product.controller';

@Module({
  providers: [CategoryProductService],
  controllers: [CategoryProductController]
})
export class CategoryProductModule {}
