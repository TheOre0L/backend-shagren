"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusTitles = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Pending"] = 1] = "Pending";
    OrderStatus[OrderStatus["Accepted"] = 2] = "Accepted";
    OrderStatus[OrderStatus["Processing"] = 3] = "Processing";
    OrderStatus[OrderStatus["Ready"] = 4] = "Ready";
    OrderStatus[OrderStatus["QA"] = 5] = "QA";
    OrderStatus[OrderStatus["ReadyToDelivery"] = 6] = "ReadyToDelivery";
    OrderStatus[OrderStatus["DeliveryAccepted"] = 7] = "DeliveryAccepted";
    OrderStatus[OrderStatus["Delivering"] = 8] = "Delivering";
    OrderStatus[OrderStatus["Success"] = 9] = "Success";
    OrderStatus[OrderStatus["Failed"] = 10] = "Failed";
    OrderStatus[OrderStatus["Cancelled"] = 11] = "Cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
const OrderStatusTitles = {
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
exports.OrderStatusTitles = OrderStatusTitles;
//# sourceMappingURL=status.js.map