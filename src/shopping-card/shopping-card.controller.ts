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
import { PrismaService } from 'nestjs-prisma';
import { waitForDebugger } from 'inspector';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(
    private readonly shoppingCartService: ShoppingCardService,
    private prisma: PrismaService,
  ) {}

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

  @Get('count')
  @UseGuards(AccessTokenGuard)
  async incDec(
    @Req()
    req: Request & {
      user: {
        userId: UUID;
      };
    },
    @Query('item') id: string,
    @Query('count') count: number,
  ) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId: req.user.userId },
    });
    if (!cart) {
      throw new Error('Cart not found');
    }
    if (count === 0) {
      await this.prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId: id,
        },
      });
    }
    await this.prisma.cartItem.updateMany({
      where: {
        cartId: cart.id,
        productId: id,
      },
      data: {
        quantity: count,
      },
    });

    return await this.prisma.cart.findUnique({
      where: { userId: req.user.userId },
      include: { cartItems: { include: { product: true } } },
    });
  }
}
