import type { Amount } from './common.interface';
export declare enum VatCodesEnum {
    'ndsNone' = 1,
    'nds0' = 2,
    'nds10' = 3,
    'nds20' = 4,
    'nds10/110' = 5,
    'nds20/120' = 6
}
export declare enum TaxSystemCodesEnum {
    'OSN' = 1,
    'USN6' = 2,
    'USN15' = 3,
    'ENVD' = 4,
    'ESN' = 5,
    'PSN' = 6
}
export declare enum ReceiptRegistrationEnum {
    pending = "pending",
    succeeded = "succeeded",
    canceled = "canceled"
}
export interface ReceiptItem {
    description: string;
    quantity: number;
    amount: Amount;
    vat_code: VatCodesEnum;
    payment_mode: string;
    payment_subject: string;
    country_of_origin_code?: string;
}
export interface Settlement {
    type: 'prepayment' | 'full_payment' | 'advance' | 'credit';
    amount: Amount;
}
export interface ReceiptDetails {
    id: string;
    type: 'payment' | 'refund';
    payment_id?: string;
    refund_id?: string;
    status: ReceiptRegistrationEnum;
    fiscal_document_number?: string;
    fiscal_storage_number?: string;
    fiscal_attribute?: string;
    registered_at?: string;
    fiscal_provider_id?: string;
    tax_system_code?: TaxSystemCodesEnum;
    items: ReceiptItem[];
    settlements?: Settlement[];
}
