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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const PaymentTypes = require("./external/interfaces");
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    createPay(param) {
        return this.paymentService.createPayment(param);
    }
    acceptPay(id) {
        return this.paymentService.acceptPayment(id);
    }
    cancelPay(id) {
        return this.paymentService.cancelPayment(id);
    }
    async listPay(action, paymentId, limit, from, to) {
        const param = {
            paymentId,
            filter: {
                limit,
                from,
                to,
            },
        };
        return await this.paymentService.getPayments(action, param);
    }
    async refundPay(action, refundId, body) {
        return await this.paymentService.refundPay(action, refundId, body);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "createPay", null);
__decorate([
    (0, common_1.Get)('/accept'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "acceptPay", null);
__decorate([
    (0, common_1.Get)('/cancel'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "cancelPay", null);
__decorate([
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Query)('paymentId')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('from')),
    __param(4, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "listPay", null);
__decorate([
    (0, common_1.Post)('refund'),
    __param(0, (0, common_1.Query)('action')),
    __param(1, (0, common_1.Query)('refundId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "refundPay", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map