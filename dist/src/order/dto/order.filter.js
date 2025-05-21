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
exports.OrderFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const crypto_1 = require("crypto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const status_1 = require("../types/status");
class OrderFilterDto extends pagination_dto_1.PaginationFilterDto {
    statusId;
    customerId;
    createdFrom;
    createdTo;
}
exports.OrderFilterDto = OrderFilterDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiProperty)({
        description: 'Фильтр по статусу заказа. Можно указать несколько',
        name: 'statusId',
        enum: status_1.OrderStatus,
        example: status_1.OrderStatus.Pending,
        format: 'number',
        required: false,
    }),
    __metadata("design:type", Number)
], OrderFilterDto.prototype, "statusId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Фильтр по покупателю',
        name: 'customerId',
        format: 'uuid',
        example: (0, crypto_1.randomUUID)(),
        required: false,
    }),
    __metadata("design:type", String)
], OrderFilterDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Фильтр по дате создания. Заказ создан после указаной даты',
        name: 'createdFrom',
        example: new Date(),
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrderFilterDto.prototype, "createdFrom", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Фильтр по дате создания. Заказ создан до указаной даты',
        name: 'createdTo',
        example: new Date(Date.now() + 60 * 60 * 24 * 1000),
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrderFilterDto.prototype, "createdTo", void 0);
//# sourceMappingURL=order.filter.js.map