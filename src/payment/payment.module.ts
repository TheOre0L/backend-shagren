import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { YookassaModule } from './external'; // Import the actual module
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    YookassaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        shopId: configService.get<string>('payment.yookassa.shopId') || '',
        apiKey: configService.get<string>('payment.yookassa.apiKey') || '',
      }),
    }),
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
