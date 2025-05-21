export * from './common.interface';
export * from './yookassa-options.interface';
export * from './confirmation.interface';
export * from './payment-details.interface';
export * from './payment-method.interface';
export * from './payment-request.interface';
export * from './refund-details.interface';
export * from './refund-request.interface';
export declare class PaymentGetRequest {
    paymentId?: string;
    filter?: PaymentFilter;
}
export declare class PaymentFilter {
    limit?: number;
    from?: string;
    to?: string;
}
