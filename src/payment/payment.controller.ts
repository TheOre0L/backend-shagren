import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import * as PaymentTypes from './external/interfaces';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  createPay(@Body() param: PaymentTypes.PaymentCreateRequest) {
    return this.paymentService.createPayment(param);
  }

  @Get('/accept')
  acceptPay(@Query('id') id: string) {
    return this.paymentService.acceptPayment(id);
  }

  @Get('/cancel')
  cancelPay(@Query('id') id: string) {
    return this.paymentService.cancelPayment(id);
  }

  @Get('/list')
  async listPay(
    @Query('action') action: string,
    @Query('paymentId') paymentId?: string, // Передаем paymentId через query
    @Query('limit') limit?: number, // Передаем limit через query
    @Query('from') from?: string, // Передаем from через query
    @Query('to') to?: string, // Передаем to через query
  ) {
    const param: PaymentTypes.PaymentGetRequest = {
      paymentId,
      filter: {
        limit,
        from,
        to,
      },
    };
    return await this.paymentService.getPayments(action, param);
  }

  @Post('refund')
  async refundPay(
    @Query('action') action: string,
    @Query('refundId') refundId: string,
    @Body() body: { paymentId: string; description: string },
  ) {
    return await this.paymentService.refundPay(action, refundId, body);
  }
}
