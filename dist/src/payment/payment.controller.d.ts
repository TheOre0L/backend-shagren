import { PaymentService } from './payment.service';
import * as PaymentTypes from './external/interfaces';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPay(param: PaymentTypes.PaymentCreateRequest): Promise<PaymentTypes.PaymentDetails>;
    acceptPay(id: string): Promise<PaymentTypes.PaymentDetails>;
    cancelPay(id: string): Promise<PaymentTypes.PaymentDetails>;
    listPay(action: string, paymentId?: string, limit?: number, from?: string, to?: string): Promise<PaymentTypes.PaymentDetails | PaymentTypes.PaymentDetails[]>;
    refundPay(action: string, refundId: string, body: {
        paymentId: string;
        description: string;
    }): Promise<PaymentTypes.RefundDetails>;
}
