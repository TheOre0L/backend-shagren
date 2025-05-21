import { UUID } from 'crypto';
import { OrderStatus } from '../types/status';
export declare class OrderResponseDto {
    id: UUID;
    customerId: string;
    quantity: number;
    price: number;
    statusId: OrderStatus;
    statusTitle: string;
    paymentId: string | null;
    deliveryId: string;
    notes: string;
    paid: boolean;
    createdAt: Date;
    updatedAt: Date;
}
