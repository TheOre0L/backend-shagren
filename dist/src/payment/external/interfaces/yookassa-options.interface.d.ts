import type { FactoryProvider, ModuleMetadata } from '@nestjs/common';
export declare const YookassaOptionsSymbol: unique symbol;
export type YookassaOptions = {
    shopId: string;
    apiKey: string;
};
export type YookassaAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<YookassaOptions>, 'useFactory' | 'inject'>;
