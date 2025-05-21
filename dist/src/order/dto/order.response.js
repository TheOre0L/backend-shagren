"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const status_1 = require("../types/status");
class OrderResponseDto {
    id;
    customerId;
    quantity;
    price;
    statusId;
    statusTitle;
    paymentId;
    deliveryId;
    notes;
    paid;
    createdAt;
    updatedAt;
}
exports.OrderResponseDto = OrderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'uuid',
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'uuid',
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Общее кол-во продукции в заказе',
    }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Стоимость заказа в рублях, без учета доставки',
    }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: status_1.OrderStatus,
    }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Object.values(status_1.OrderStatusTitles),
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "statusTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'uuid',
    }),
    __metadata("design:type", Object)
], OrderResponseDto.prototype, "paymentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'uuid',
    }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "deliveryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], OrderResponseDto.prototype, "paid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], OrderResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], OrderResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=order.response.js.map