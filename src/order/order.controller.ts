import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UUID } from 'crypto';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Response } from 'express';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async checkout(
    @Req()
    req: Request & {
      user: {
        userId: UUID;
      };
    },
    @Res() res: Response,
    @Body() body: any,
  ) {
    return this.orderService.createOrderFromCart(req.user.userId, body, res);
  }

  // Получить заказы пользователя
  @UseGuards(AccessTokenGuard)
  @Get()
  getOrders(
    @Req()
    req: Request & {
      user: {
        userId: UUID;
      };
    },
  ) {
    return this.orderService.getOrders();
  }
  @Patch()
  editOrder(
    @Query('orderId') orderId: string,
    @Query('status') status: string,
  ) {
    return this.orderService.updateOrder(orderId, status);
  }

  // Отменить заказ
  @Delete()
  cancelOrder(@Query('orderId') orderId: string) {
    return this.orderService.cancelOrder(orderId);
  }

  @Get('stats')
  stats() {
    return this.orderService.getStats();
  }
}
