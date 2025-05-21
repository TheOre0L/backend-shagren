"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var YookassaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.YookassaModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const yookassa_options_interface_1 = require("./interfaces/yookassa-options.interface");
const yookassa_service_1 = require("./yookassa.service");
let YookassaModule = YookassaModule_1 = class YookassaModule {
    static forRoot(options) {
        return {
            module: YookassaModule_1,
            imports: [axios_1.HttpModule],
            providers: [
                {
                    provide: yookassa_options_interface_1.YookassaOptionsSymbol,
                    useValue: options,
                },
                yookassa_service_1.YookassaService,
            ],
            exports: [yookassa_service_1.YookassaService],
            global: true,
        };
    }
    static forRootAsync(options) {
        return {
            module: YookassaModule_1,
            imports: [axios_1.HttpModule, ...(options.imports || [])],
            providers: [
                {
                    provide: yookassa_options_interface_1.YookassaOptionsSymbol,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                yookassa_service_1.YookassaService,
            ],
            exports: [yookassa_service_1.YookassaService],
            global: true,
        };
    }
};
exports.YookassaModule = YookassaModule;
exports.YookassaModule = YookassaModule = YookassaModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], YookassaModule);
//# sourceMappingURL=yookassa.module.js.map