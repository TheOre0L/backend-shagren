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
exports.CdekService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mod_1 = require("./external/mod");
const nestjs_prisma_1 = require("nestjs-prisma");
let CdekService = class CdekService {
    configService;
    prisma;
    cdekClient;
    logger;
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
        this.logger = new common_1.Logger('CDEK');
        const config = configService.get('delivery.cdek');
        if (!config?.enabled) {
            this.logger.warn('Не настроен CDEK!');
        }
        else {
            this.cdekClient = new mod_1.Cdek(config);
        }
    }
    async widgetProcess(action, params, response) {
        const startTime = performance.now();
        let promise;
        if (!params.size) {
            delete params.size;
        }
        switch (action) {
            case 'offices':
                promise = this.cdekClient.getPickupPoints(params);
                break;
            case 'calculate':
                promise = this.calculationTariffPrice('getTariffs', params, response);
                break;
            default:
                throw new Error('Unknown action');
        }
        try {
            const data = await promise;
            const headers = this.cdekClient.getResponseHeaders();
            response.setHeaders(new Headers({
                Server: headers.get('server') || '',
                'X-Current-Page': headers.get('x-current-page') || '',
                'X-Total-Elements': headers.get('x-total-elements') || '',
                'X-Total-Pages': headers.get('x-total-pages') || '',
            }));
            const endTime = performance.now();
            this.logger.log(`CDEK performance: [${action}:${params.page || 0}:${params.size || 0}]: ${Math.round(endTime - startTime)} ms`);
            return response.send(data);
        }
        catch (e) {
            this.logger.error('Ошибка CDEK');
            this.logger.error(e);
        }
    }
    async calculationTariffPrice(action, params, response) {
        const startTime = performance.now();
        let promise;
        switch (action) {
            case 'byTariff':
                promise = this.cdekClient.calculatorByTariff(params);
                break;
            case 'getTariffs':
                promise = this.cdekClient.calculatorByAvaibleTariffs(params);
                break;
            default:
                throw new Error('Неизвестное действие!');
        }
        try {
            const data = await promise;
            const endTime = performance.now();
            this.logger.log(`CDEK performance: [${action}]: ${Math.round(endTime - startTime)} ms]`);
            return response.send(data);
        }
        catch (e) {
            this.logger.error('Ошибка CDEK');
            this.logger.error(e);
            response.status(400).json(e);
        }
    }
    async orderProcess(action, params, response) {
        const startTime = performance.now();
        let promise;
        switch (action) {
            case 'create':
                promise = this.cdekClient.addOrder(params);
                break;
            case 'update':
                promise = this.cdekClient.updateOrder(params);
                break;
            case 'getByUUID':
                promise = this.cdekClient.getOrderByUUID(params);
                break;
            case 'refusal':
                promise = this.cdekClient.addRefusal(params);
                break;
            case 'delete':
                promise = this.cdekClient.deleteOrderByUUID(params);
                break;
            default:
                throw new Error('Неизвестное действие!');
        }
        try {
            const data = await promise;
            const endTime = performance.now();
            this.logger.log(`CDEK performance: [${action}]: ${Math.round(endTime - startTime)} ms]`);
            return { data };
        }
        catch (e) {
            this.logger.error('Ошибка CDEK');
            this.logger.error(e);
        }
    }
    async webhookProcess(action, param, response) {
        const startTime = performance.now();
        let promise;
        switch (action) {
            case 'add':
                promise = this.cdekClient.addWebhook(param);
                break;
            case 'delete':
                promise = this.cdekClient.deleteWebhookByUUID(param);
                break;
            case 'get':
                promise = this.cdekClient.getWebhookByUUID(param);
                break;
            default:
                throw new Error('Неизвестное действие!');
        }
        try {
            const data = await promise;
            const endTime = performance.now();
            this.logger.log(`CDEK performance: [${action}]: ${Math.round(endTime - startTime)} ms]`);
            return response.send(data);
        }
        catch (e) {
            this.logger.error('Ошибка CDEK');
            this.logger.error(e);
            response.status(400).json(e);
        }
    }
};
exports.CdekService = CdekService;
exports.CdekService = CdekService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        nestjs_prisma_1.PrismaService])
], CdekService);
//# sourceMappingURL=cdek.service.js.map