import { HttpService } from '@nestjs/axios';
import { type PaymentCreateRequest, type PaymentDetails, type YookassaOptions } from './interfaces';
import { RefundDetails } from './interfaces/refund-details.interface';
import { RefundCreateRequest } from './interfaces/refund-request.interface';
export declare class YookassaService {
    private readonly options;
    private readonly httpService;
    private readonly shopId;
    private readonly apiKey;
    private readonly apiUrl;
    constructor(options: YookassaOptions, httpService: HttpService);
    createPayment(paymentData: PaymentCreateRequest): Promise<PaymentDetails>;
    getPayments(limit?: number, from?: string, to?: string): Promise<PaymentDetails[]>;
    getPaymentDetails(paymentId: string): Promise<PaymentDetails>;
    capturePayment(paymentId: string): Promise<PaymentDetails>;
    cancelPayment(paymentId: string): Promise<PaymentDetails>;
    createRefund(refundData: RefundCreateRequest): Promise<RefundDetails>;
    getRefunds(limit?: number, from?: string, to?: string): Promise<RefundDetails[]>;
    getRefundDetails(refundId: string): Promise<RefundDetails>;
}
