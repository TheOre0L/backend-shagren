import { type DynamicModule } from '@nestjs/common';
import { type YookassaAsyncOptions, type YookassaOptions } from './interfaces/yookassa-options.interface';
export declare class YookassaModule {
    static forRoot(options: YookassaOptions): DynamicModule;
    static forRootAsync(options: YookassaAsyncOptions): DynamicModule;
}
