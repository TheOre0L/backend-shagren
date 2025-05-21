import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { OrderStatus, OrderStatusTitles } from '../types/status';

export class OrderResponseDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: UUID;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  customerId: string;

  @ApiProperty({
    description: 'Общее кол-во продукции в заказе',
  })
  quantity: number;

  @ApiProperty({
    description: 'Стоимость заказа в рублях, без учета доставки',
  })
  price: number;

  @ApiProperty({
    enum: OrderStatus,
  })
  statusId: OrderStatus;

  @ApiProperty({
    enum: Object.values(OrderStatusTitles),
  })
  statusTitle: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  paymentId: string | null;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  deliveryId: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  paid: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
