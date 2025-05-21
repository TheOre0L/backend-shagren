import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  log: Logger;
  constructor() {
    this.log = new Logger('ExceptionFilter');
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Internal server error';
    let code = '0'; // unknown error

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();

      // FIXME
      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object') {
        message = (response as { message: string }).message;
      }
    } else if (exception instanceof PrismaClientKnownRequestError) {
      code = exception.code;
      status = 400;
      message = exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.log.debug(exception);

    const errorJSON = {
      message,
      code,
      timestamp: new Date(),
    };

    response.status(status).json(errorJSON);
  }
}
