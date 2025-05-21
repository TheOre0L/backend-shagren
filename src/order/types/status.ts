enum OrderStatus {
  /** Новый заказ. Статус по-умолчанию. */
  Pending = 1,
  /** TODO: описать */
  Accepted,
  /** TODO: описать */
  Processing,
  /** TODO: описать */
  Ready,
  /** TODO: описать */
  QA,
  /** TODO: описать */
  ReadyToDelivery,
  /** TODO: описать */
  DeliveryAccepted,
  /** TODO: описать */
  Delivering,
  /** TODO: описать */
  Success,
  /** TODO: описать */
  Failed,
  /** TODO: описать */
  Cancelled,
}

// TODO: черновик
const OrderStatusTitles: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: 'Новый',
  [OrderStatus.Accepted]: 'Принят',
  [OrderStatus.Processing]: 'В работе',
  [OrderStatus.Ready]: 'Готов',
  [OrderStatus.QA]: 'Контроль качества',
  [OrderStatus.ReadyToDelivery]: 'Готов к доставке',
  [OrderStatus.DeliveryAccepted]: 'Передан в доставку',
  [OrderStatus.Delivering]: 'Доставляется',
  [OrderStatus.Success]: 'Завершен',
  [OrderStatus.Failed]: 'Неуспешный',
  [OrderStatus.Cancelled]: 'Отменен',
};

export { OrderStatus, OrderStatusTitles };
