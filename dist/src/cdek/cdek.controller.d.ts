import { CdekService } from './cdek.service';
import { WidgetServiceDto } from './dto/widget.dto';
import { Response } from 'express';
import { ApiRequest } from './external/mod';
export declare class CdekController {
    private readonly cdekService;
    constructor(cdekService: CdekService);
    widgetServiceGet(is_handout: boolean, action: string, page: number, size: number, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
    widgetServicePost(params: WidgetServiceDto & (ApiRequest.GetPickupPoints | ApiRequest.CalculatorByAvaibleTariffs), response: Response): Promise<Response<any, Record<string, any>> | undefined>;
    calculateTariffPrice(action: string, params: ApiRequest.CalculatorByAvaibleTariffs | ApiRequest.CalculatorByTariff, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
    orderServicePost(action: string, params: ApiRequest.AddOrder, response: Response): Promise<{
        data: import("./external/types/api/base").EntityOperation | import("./external/types/api/response").GetOrder;
    } | undefined>;
    orderServicePatch(action: string, params: ApiRequest.UpdateOrder, response: Response): Promise<{
        data: import("./external/types/api/base").EntityOperation | import("./external/types/api/response").GetOrder;
    } | undefined>;
    orderServiceDelete(action: 'delete', uuid: string, response: Response): Promise<{
        data: import("./external/types/api/base").EntityOperation | import("./external/types/api/response").GetOrder;
    } | undefined>;
    orderServiceGet(action: string, uuid: string, response: Response): Promise<{
        data: import("./external/types/api/base").EntityOperation | import("./external/types/api/response").GetOrder;
    } | undefined>;
    webhookServiceGet(action: 'get', uuid: string, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
    webhookServicePost(action: 'add', params: ApiRequest.AddWebhook, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
    webhookServiceDelete(action: 'delete', uuid: string, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
