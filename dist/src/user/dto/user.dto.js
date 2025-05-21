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
exports.UpdateUserDto = exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    name;
    password;
    phone;
    email;
    role;
    isActive;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ФИО пользователя',
        required: true,
        example: 'Петров Пётр Петрович',
        type: 'string',
    }),
    (0, class_validator_1.IsString)({ message: 'Введённое значение не является строкой.' }),
    (0, class_validator_1.Length)(2, 100, { message: 'ФИО должно содержать от 2 до 100 символов.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Указываемое значение не должно быть пустым.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Пароль пользователя',
        required: true,
        example: 'Qwerty123@',
        type: 'string',
    }),
    (0, class_validator_1.IsString)({ message: 'Введённое значение не является строкой.' }),
    (0, class_validator_1.Length)(6, 32, {
        message: 'Длина пароля должна быть не меньше 6 и не больше 32 символов.',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Указываемое значение не должно быть пустым.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Номер телефона пользователя',
        required: true,
        example: '+79283000001',
        type: 'string',
    }),
    (0, class_validator_1.IsPhoneNumber)('RU', {
        message: 'Номер телефона должен соответсвовать формату - +79283000001',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Указываемое значение не должно быть пустым.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'E-mail пользователя',
        example: 'example@example.com',
        type: 'string',
    }),
    (0, class_validator_1.IsString)({ message: 'Введённое значение не является строкой.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Указываемое значение не должно быть пустым.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Указанное значение не является адресом электронной почты.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Роль пользователя',
        example: ['admin', 'user'],
        type: 'string',
    }),
    (0, class_validator_1.IsString)({ message: 'Введённое значение не является строкой.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Указываемое значение не должно быть пустым.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Статус пользователя',
        example: true,
        type: 'boolean',
    }),
    (0, class_validator_1.IsBoolean)({ message: 'Значение должно быть true или false.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Указываемое значение не должно быть пустым.' }),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isActive", void 0);
class UpdateUserDto extends (0, swagger_1.PartialType)(CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=user.dto.js.map