import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CdekService } from './cdek.service';
import { WidgetServiceDto } from './dto/widget.dto';
import { Response } from 'express';
import { ApiRequest } from './external/mod';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('cdek')
export class CdekController {
  constructor(private readonly cdekService: CdekService) {}

  @Get('widget')
  @Header('Access-Control-Expose-Headers', '*')
  widgetServiceGet(
    @Query('is_handout') is_handout: boolean,
    @Query('action') action: string,
    @Query('page') page: number,
    @Query('size') size: number,
    @Res() response: Response,
  ) {
    const params: WidgetServiceDto = {
      is_handout,
      action,
      page,
      size,
    };

    return this.cdekService.widgetProcess(action, params, response);
  }

  @Post('widget')
  @Header('Access-Control-Expose-Headers', '*')
  widgetServicePost(
    @Body()
    params: WidgetServiceDto &
      (ApiRequest.GetPickupPoints | ApiRequest.CalculatorByAvaibleTariffs),
    @Res() response: Response,
  ) {
    return this.cdekService.widgetProcess(params.action, params, response);
  }

  /**
   * @description Калькулятор стоимости отправления
   */
  @Post('calculate')
  calculateTariffPrice(
    @Query('action') action: string,
    @Body()
    params:
      | ApiRequest.CalculatorByAvaibleTariffs
      | ApiRequest.CalculatorByTariff,
    @Res() response: Response,
  ) {
    return this.cdekService.calculationTariffPrice(action, params, response);
  }

  /**
   * @description Работа с заказами
   */
  @Post('order')
  @Header('Access-Control-Expose-Headers', '*')
  @ApiOperation({ summary: 'Работа с доставкой CDEK' })
  @ApiNotFoundResponse({ description: 'Не найдено' })
  @ApiBadRequestResponse({ description: 'Неверно заданы параметры' })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  orderServicePost(
    @Query('action') action: string,
    @Body() params: ApiRequest.AddOrder,
    @Res() response: Response,
  ) {
    return this.cdekService.orderProcess(action, params, response);
  }

  @Patch('order')
  orderServicePatch(
    @Query('action') action: string,
    @Body() params: ApiRequest.UpdateOrder,
    @Res() response: Response,
  ) {
    return this.cdekService.orderProcess(action, params, response);
  }

  @Delete('order')
  orderServiceDelete(
    @Query('action') action: 'delete',
    @Query('uuid') uuid: string,
    @Res() response: Response,
  ) {
    return this.cdekService.orderProcess(action, uuid, response);
  }

  @Get('order')
  @Header('Access-Control-Expose-Headers', '*')
  @ApiOperation({ summary: 'Работа с доставкой CDEK' })
  @ApiNotFoundResponse({ description: 'Не найдено' })
  @ApiBadRequestResponse({ description: 'Неверно заданы параметры' })
  @ApiForbiddenResponse({ description: 'Доступ запрещен' })
  orderServiceGet(
    @Query('action') action: string,
    @Query('uuid') uuid: string,
    @Res() response: Response,
  ) {
    return this.cdekService.orderProcess(action, uuid, response);
  }

  /**
   * @description Работа с вебхуками
   */
  @Get('webhook')
  webhookServiceGet(
    @Query('action') action: 'get',
    @Query('uuid') uuid: string,
    @Res() response: Response,
  ) {
    return this.cdekService.webhookProcess(action, uuid, response);
  }

  @Post('webhook')
  webhookServicePost(
    @Query('action') action: 'add',
    @Body() params: ApiRequest.AddWebhook,
    @Res() response: Response,
  ) {
    return this.cdekService.webhookProcess(action, params, response);
  }

  @Delete('webhook')
  webhookServiceDelete(
    @Query('action') action: 'delete',
    @Query('uuid') uuid: string,
    @Res() response: Response,
  ) {
    return this.cdekService.webhookProcess(action, uuid, response);
  }
}
