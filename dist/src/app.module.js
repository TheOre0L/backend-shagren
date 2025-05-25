"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const throttler_1 = require("@nestjs/throttler");
const path_1 = require("path");
const nestjs_prisma_1 = require("nestjs-prisma");
const configuration_1 = require("../config/configuration");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const order_module_1 = require("./order/order.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const product_module_1 = require("./product/product.module");
const cdek_module_1 = require("./cdek/cdek.module");
const payment_module_1 = require("./payment/payment.module");
const shopping_card_module_1 = require("./shopping-card/shopping-card.module");
const reviews_service_1 = require("./reviews/reviews.service");
const reviews_module_1 = require("./reviews/reviews.module");
const type_product_module_1 = require("./type-product/type-product.module");
const category_product_module_1 = require("./category-product/category-product.module");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const notification_module_1 = require("./notification/notification.module");
const user_service_1 = require("./user/user.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: 60000,
                        limit: 10,
                    },
                ],
            }),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './dist/uploads',
                    filename: (req, file, cb) => {
                        const filename = `${file.originalname}`;
                        cb(null, filename);
                    },
                }),
            }),
            serve_static_1.ServeStaticModule.forRootAsync({
                useFactory: (config) => {
                    const uploadsDir = config.get('uploadPath');
                    return [
                        {
                            serveRoot: '/uploads',
                            rootPath: (0, path_1.join)(__dirname, '..', uploadsDir),
                        },
                    ];
                },
                inject: [config_1.ConfigService],
            }),
            nestjs_prisma_1.PrismaModule.forRoot({
                isGlobal: true,
                prismaServiceOptions: {
                    explicitConnect: true,
                    prismaOptions: {
                        omit: {
                            user: {
                                password: true,
                                refreshToken: true,
                            },
                        },
                        errorFormat: 'minimal',
                        log: [
                            { emit: 'event', level: 'query' },
                            { emit: 'stdout', level: 'info' },
                            { emit: 'stdout', level: 'warn' },
                            { emit: 'stdout', level: 'error' },
                        ],
                    },
                    middlewares: [
                        (0, nestjs_prisma_1.loggingMiddleware)({
                            logger: new common_1.Logger('PrismaMiddleware'),
                            logLevel: 'debug',
                        }),
                    ],
                },
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            order_module_1.OrderModule,
            product_module_1.ProductModule,
            cdek_module_1.CdekModule,
            payment_module_1.PaymentModule,
            shopping_card_module_1.ShoppingCardModule,
            reviews_module_1.ReviewsModule,
            type_product_module_1.TypeProductModule,
            category_product_module_1.CategoryProductModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, reviews_service_1.ReviewsService, user_service_1.UserService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map