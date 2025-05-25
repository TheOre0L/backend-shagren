import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CdekService } from 'src/cdek/cdek.service';
import { PaymentService } from 'src/payment/payment.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, CdekService, PaymentService, NotificationService],
})
export class OrderModule {}
