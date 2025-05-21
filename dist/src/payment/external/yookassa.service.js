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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YookassaService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
const interfaces_1 = require("./interfaces");
const yookassa_constants_1 = require("./yookassa.constants");
let YookassaService = class YookassaService {
    options;
    httpService;
    shopId;
    apiKey;
    apiUrl;
    constructor(options, httpService) {
        this.options = options;
        this.httpService = httpService;
        this.shopId = options.shopId;
        this.apiKey = options.apiKey;
        this.apiUrl = yookassa_constants_1.DEFAULT_URL;
    }
    async createPayment(paymentData) {
        const idempotenceKey = (0, uuid_1.v4)();
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.apiUrl}payments`, paymentData, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
                    'Content-Type': 'application/json',
                    'Idempotence-Key': idempotenceKey,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description || 'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPayments(limit = 10, from = '', to = '') {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.apiUrl}payments`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
                },
                params: {
                    limit,
                    from,
                    to,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description || 'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPaymentDetails(paymentId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.apiUrl}payments/${paymentId}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description || 'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async capturePayment(paymentId) {
        const idempotenceKey = (0, uuid_1.v4)();
        try {
            const { amount } = await this.getPaymentDetails(paymentId);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.apiUrl}payments/${paymentId}/capture`, { amount }, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
                    'Content-Type': 'application/json',
                    'Idempotence-Key': idempotenceKey,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description || 'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async cancelPayment(paymentId) {
        const idempotenceKey = (0, uuid_1.v4)();
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.apiUrl}payments/${paymentId}/cancel`, {}, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
                    'Content-Type': 'application/json',
                    'Idempotence-Key': idempotenceKey,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description || 'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createRefund(refundData) {
        const idempotenceKey = (0, uuid_1.v4)();
        try {
            const { amount } = await this.getPaymentDetails(refundData.payment_id);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.apiUrl}refunds`, {
                payment_id: refundData.payment_id,
                amount,
                description: refundData.description,
            }, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
                    'Content-Type': 'application/json',
                    'Idempotence-Key': idempotenceKey,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description || 'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getRefunds(limit = 10, from = '', to = '') {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.apiUrl}refunds`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
                },
                params: {
                    limit,
                    from,
                    to,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description || 'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getRefundDetails(refundId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.apiUrl}refunds/${refundId}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description || 'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.YookassaService = YookassaService;
exports.YookassaService = YookassaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.YookassaOptionsSymbol)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], YookassaService);
//# sourceMappingURL=yookassa.service.js.map