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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const external_1 = require("./external");
let PaymentService = class PaymentService {
    prismaService;
    yookassaService;
    constructor(prismaService, yookassaService) {
        this.prismaService = prismaService;
        this.yookassaService = yookassaService;
    }
    async createPayment(param) {
        return await this.yookassaService.createPayment(param);
    }
    async acceptPayment(param) {
        return await this.yookassaService.capturePayment(param);
    }
    async cancelPayment(param) {
        return await this.yookassaService.cancelPayment(param);
    }
    async getPayments(action, param) {
        try {
            switch (action) {
                case 'getOne': {
                    if (!param.paymentId) {
                        throw new Error('paymentId is required for "getOne" action');
                    }
                    return await this.yookassaService.getPaymentDetails(param.paymentId);
                }
                case 'getMany': {
                    const { limit, from, to } = param.filter || {};
                    return await this.yookassaService.getPayments(limit, from, to);
                }
                default:
                    throw new Error(`Invalid action: ${action}`);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error occurred while fetching payments', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async refundPay(action, refundId, body) {
        switch (action) {
            case 'create': {
                return await this.yookassaService.createRefund({
                    payment_id: body.paymentId,
                    description: body.description,
                });
            }
            case 'getOne': {
                return await this.yookassaService.getRefundDetails(refundId);
            }
            default:
                throw new Error(`Invalid action: ${action}`);
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        external_1.YookassaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map