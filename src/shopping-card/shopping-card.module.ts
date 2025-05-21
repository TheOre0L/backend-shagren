import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-card.controller';
import { ShoppingCardService } from './shopping-card.service';

@Module({
  controllers: [ShoppingCartController],
  providers: [ShoppingCardService],
})
export class ShoppingCardModule {}
