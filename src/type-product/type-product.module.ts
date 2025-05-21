import { Module } from '@nestjs/common';
import { TypeProductService } from './type-product.service';
import { TypeProductController } from './type-product.controller';

@Module({
  providers: [TypeProductService],
  controllers: [TypeProductController],
})
export class TypeProductModule {}
