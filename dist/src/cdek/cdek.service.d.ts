import { ConfigService } from '@nestjs/config';
import { ApiRequest } from './external/mod';
import { Response } from 'express';
import { WidgetServiceDto } from './dto/widget.dto';
import { PrismaService } from 'nestjs-prisma';
export declare class CdekService {
    private readonly configService;
    private readonly prisma;
    private cdekClient;
    private logger;
    constructor(configService: ConfigService, prisma: PrismaService);
    widgetProcess(action: string, params: WidgetServiceDto & (ApiRequest.GetPickupPoints | ApiRequest.CalculatorByAvaibleTariffs), response: Response): Promise<Response<any, Record<string, any>> | undefined>;
    calculationTariffPrice(action: string, params: ApiRequest.CalculatorByAvaibleTariffs | ApiRequest.CalculatorByTariff, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
    orderProcess(action: string, params: ApiRequest.AddOrder | ApiRequest.UpdateOrder | string, response: Response): Promise<{
        data: import("./external/types/api/base").EntityOperation | import("./external/types/api/response").GetOrder;
    } | undefined>;
    webhookProcess(action: string, param: ApiRequest.AddWebhook | string, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
