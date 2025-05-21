import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiRequest, Cdek } from './external/mod';

import { CDEKConfig } from 'config/configuration';
import { Response } from 'express';
import { WidgetServiceDto } from './dto/widget.dto';
import { InitOptions } from './external/types/lib';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CdekService {
  private cdekClient: Cdek;
  private logger: Logger;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.logger = new Logger('CDEK');
    const config = configService.get<CDEKConfig>('delivery.cdek');

    if (!config?.enabled) {
      this.logger.warn('Не настроен CDEK!');
    } else {
      this.cdekClient = new Cdek(config as InitOptions);
    }
  }
  /**
   * @name 'Получение офисов'
   * @description 'Получение списка ПВЗ'
   * @param action: string
   * @param params: WidgetServiceDto & (ApiRequest.GetPickupPoints | ApiRequest.CalculatorByAvaibleTariffs)
   * @param response: Response
   * @return {GetPickupPoints | CalculatorByAvaibleTariffs}
   */
  async widgetProcess(
    action: string,
    params: WidgetServiceDto &
      (ApiRequest.GetPickupPoints | ApiRequest.CalculatorByAvaibleTariffs),
    response: Response,
  ) {
    const startTime = performance.now();

    let promise;

    if (!params.size) {
      delete params.size;
    }

    switch (action) {
      case 'offices':
        promise = this.cdekClient.getPickupPoints(
          params as ApiRequest.GetPickupPoints,
        );
        break;
      case 'calculate':
        promise = this.calculationTariffPrice(
          'getTariffs',
          params as ApiRequest.CalculatorByAvaibleTariffs,
          response,
        );
        break;

      default:
        throw new Error('Unknown action');
    }

    try {
      const data = await promise;
      const headers = this.cdekClient.getResponseHeaders();

      response.setHeaders(
        // headers,
        new Headers({
          Server: headers.get('server') || '',
          'X-Current-Page': headers.get('x-current-page') || '',
          'X-Total-Elements': headers.get('x-total-elements') || '',
          'X-Total-Pages': headers.get('x-total-pages') || '',
        }),
      );

      const endTime = performance.now();
      this.logger.log(
        `CDEK performance: [${action}:${params.page || 0}:${params.size || 0}]: ${Math.round(endTime - startTime)} ms`,
      );

      return response.send(data);
    } catch (e) {
      this.logger.error('Ошибка CDEK');
      this.logger.error(e);
    }
  }
  /**
   * @name 'Калькулятор стоимости отправления'
   * @description 'Расчет стоимости отправления по тарифу и получение тарифов'
   * @param action: 'byTariff' | 'getTariffs'
   * @param param: ApiRequest.CalculatorByAvaibleTariffs | ApiRequest.CalculatorByTariff
   * @param response: Response
   * @return {CalculatorByTariff | CalculatorByAvaibleTariffs}
   */
  async calculationTariffPrice(
    action: string,
    params:
      | ApiRequest.CalculatorByAvaibleTariffs
      | ApiRequest.CalculatorByTariff,
    response: Response,
  ) {
    const startTime = performance.now();
    let promise;
    switch (action) {
      case 'byTariff':
        promise = this.cdekClient.calculatorByTariff(
          params as ApiRequest.CalculatorByTariff,
        );
        break;
      case 'getTariffs':
        promise = this.cdekClient.calculatorByAvaibleTariffs(
          params as ApiRequest.CalculatorByAvaibleTariffs,
        );
        break;
      default:
        throw new Error('Неизвестное действие!');
    }
    try {
      const data = await promise;
      const endTime = performance.now();

      this.logger.log(
        `CDEK performance: [${action}]: ${Math.round(endTime - startTime)} ms]`,
      );

      return response.send(data);
    } catch (e) {
      this.logger.error('Ошибка CDEK');
      this.logger.error(e);
      response.status(400).json(e);
    }
  }
  /**
   * @name 'Действия с заказами'
   * @description 'Регистрация, изменение, удаление, регистрация возврата и получение информации по {UUID} заказа'
   * @param action: 'create' | 'update' | 'refusal' | 'delete' | 'getByUUID'
   * @param param: ApiRequest.AddOrder | ApiRequest.UpdateOrder | UUID
   * @param response: Response
   * @return {AddOrder | DeleteOrder | UpdateOrder | AddRefusal | GetOrder}
   */
  async orderProcess(
    action: string,
    params: ApiRequest.AddOrder | ApiRequest.UpdateOrder | string,
    response: Response,
  ) {
    const startTime = performance.now();

    let promise;
    switch (action) {
      case 'create':
        promise = this.cdekClient.addOrder(params as ApiRequest.AddOrder);
        break;
      case 'update':
        promise = this.cdekClient.updateOrder(params as ApiRequest.UpdateOrder);
        break;
      case 'getByUUID':
        promise = this.cdekClient.getOrderByUUID(params as string);
        break;
      case 'refusal':
        promise = this.cdekClient.addRefusal(params as string);
        break;
      case 'delete':
        promise = this.cdekClient.deleteOrderByUUID(params as string);
        break;
      default:
        throw new Error('Неизвестное действие!');
    }

    try {
      const data = await promise;
      const endTime = performance.now();

      this.logger.log(
        `CDEK performance: [${action}]: ${Math.round(endTime - startTime)} ms]`,
      );

      return { data }; // Возвращаем данные для внутренней логики
    } catch (e) {
      this.logger.error('Ошибка CDEK');
      this.logger.error(e);
    }
  }
  /**
   * @name 'Управление вебхуками'
   * @description 'Добавление, удаление и получение вебхука по его {UUID}'
   * @param action: 'add' | 'delete' | 'get'
   * @param param: ApiRequest.AddWebhook | UUID
   * @param response: Response
   * @return {GetWebhook | AddWebhook | DeleteWebhook}
   */
  async webhookProcess(
    action: string,
    param: ApiRequest.AddWebhook | string,
    response: Response,
  ) {
    const startTime = performance.now();
    let promise;
    switch (action) {
      case 'add':
        promise = this.cdekClient.addWebhook(param as ApiRequest.AddWebhook);
        break;
      case 'delete':
        promise = this.cdekClient.deleteWebhookByUUID(param as string);
        break;
      case 'get':
        promise = this.cdekClient.getWebhookByUUID(param as string);
        break;
      default:
        throw new Error('Неизвестное действие!');
    }
    try {
      const data = await promise;
      const endTime = performance.now();

      this.logger.log(
        `CDEK performance: [${action}]: ${Math.round(endTime - startTime)} ms]`,
      );
      return response.send(data);
    } catch (e) {
      this.logger.error('Ошибка CDEK');
      this.logger.error(e);
      response.status(400).json(e);
    }
  }
}
