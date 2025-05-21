import { ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
export declare class GlobalExceptionFilter implements ExceptionFilter {
    log: Logger;
    constructor();
    catch(exception: unknown, host: ArgumentsHost): void;
}
