declare enum OrderStatus {
    Pending = 1,
    Accepted = 2,
    Processing = 3,
    Ready = 4,
    QA = 5,
    ReadyToDelivery = 6,
    DeliveryAccepted = 7,
    Delivering = 8,
    Success = 9,
    Failed = 10,
    Cancelled = 11
}
declare const OrderStatusTitles: Record<OrderStatus, string>;
export { OrderStatus, OrderStatusTitles };
