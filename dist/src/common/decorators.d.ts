import { Type } from '@nestjs/common';
declare const ApiPaginatedResponse: <TModel extends Type<unknown>>(model: TModel) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export { ApiPaginatedResponse };
