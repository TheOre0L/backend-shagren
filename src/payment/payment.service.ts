import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as PaymentTypes from './external/interfaces';
import { YookassaService } from './external';

@Injectable()
export class PaymentService {
  constructor(
    private prismaService: PrismaService,
    private readonly yookassaService: YookassaService,
  ) {}

  async createPayment(param: PaymentTypes.PaymentCreateRequest) {
    return await this.yookassaService.createPayment(param);
  }

  async acceptPayment(param: string) {
    return await this.yookassaService.capturePayment(param);
  }

  async cancelPayment(param: string) {
    return await this.yookassaService.cancelPayment(param);
  }

  async refundPayment(param: PaymentTypes.RefundCreateRequest) {
    return await this.yookassaService.createRefund(param);
  }

  async getPayments(action: string, param: PaymentTypes.PaymentGetRequest) {
    try {
      switch (action) {
        case 'getOne': {
          if (!param.paymentId) {
            throw new Error('paymentId is required for "getOne" action');
          }
          return await this.yookassaService.getPaymentDetails(param.paymentId);
        }
        case 'getMany': {
          const { limit, from, to } = param.filter || {};
          return await this.yookassaService.getPayments(limit, from, to);
        }

        default:
          throw new Error(`Invalid action: ${action}`);
      }
    } catch (error) {
      throw new HttpException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        error.message || 'Error occurred while fetching payments',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async refundPay(
    action: string,
    refundId?: string,
    body?: { paymentId: string; description: string },
  ) {
    switch (action) {
      case 'create': {
        return await this.yookassaService.createRefund({
          payment_id: body!.paymentId,
          description: body!.description,
        });
      }
      case 'getOne': {
        return await this.yookassaService.getRefundDetails(refundId!);
      }
      default:
        throw new Error(`Invalid action: ${action}`);
    }
  }
}
