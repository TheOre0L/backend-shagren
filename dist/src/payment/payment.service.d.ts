import { PrismaService } from 'nestjs-prisma';
import * as PaymentTypes from './external/interfaces';
import { YookassaService } from './external';
export declare class PaymentService {
    private prismaService;
    private readonly yookassaService;
    constructor(prismaService: PrismaService, yookassaService: YookassaService);
    createPayment(param: PaymentTypes.PaymentCreateRequest): Promise<PaymentTypes.PaymentDetails>;
    acceptPayment(param: string): Promise<PaymentTypes.PaymentDetails>;
    cancelPayment(param: string): Promise<PaymentTypes.PaymentDetails>;
    refundPayment(param: PaymentTypes.RefundCreateRequest): Promise<PaymentTypes.RefundDetails>;
    getPayments(action: string, param: PaymentTypes.PaymentGetRequest): Promise<PaymentTypes.PaymentDetails | PaymentTypes.PaymentDetails[]>;
    refundPay(action: string, refundId?: string, body?: {
        paymentId: string;
        description: string;
    }): Promise<PaymentTypes.RefundDetails>;
}
