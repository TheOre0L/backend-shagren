import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CdekService } from 'src/cdek/cdek.service';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, CdekService, PaymentService],
})
export class OrderModule {}
