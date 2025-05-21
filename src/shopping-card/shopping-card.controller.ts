import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShoppingCardService } from './shopping-card.service';
import { UUID } from 'crypto';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCardService) {}

  // Добавить товар в корзину
  @Post()
  @UseGuards(AccessTokenGuard)
  addItem(
    @Req()
    req: Request & {
      user: {
        userId: UUID;
      };
    },
    @Body('productId') productId: string,
    @Body('quantity') quantity: number = 1,
  ) {
    return this.shoppingCartService.addProductToCart(
      req.user.userId,
      productId,
      quantity,
    );
  }

  // Удалить товар из корзины
  @Delete()
  @UseGuards(AccessTokenGuard)
  removeItem(
    @Req()
    req: Request & {
      user: {
        userId: UUID;
      };
    },
    @Query('productId') productId: string,
  ) {
    return this.shoppingCartService.removeProductFromCart(
      req.user.userId,
      productId,
    );
  }

  // Получить корзину пользователя
  @Get()
  @UseGuards(AccessTokenGuard)
  getCart(
    @Req()
    req: Request & {
      user: {
        userId: UUID;
      };
    },
  ) {
    return this.shoppingCartService.getCart(req.user.userId);
  }

  // Очистить корзину
  @Delete()
  @UseGuards(AccessTokenGuard)
  clearCart(
    @Req()
    req: Request & {
      user: {
        userId: UUID;
      };
    },
  ) {
    return this.shoppingCartService.clearCart(req.user.userId);
  }
}
