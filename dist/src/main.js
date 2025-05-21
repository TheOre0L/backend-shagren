"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const globalExceptions_handler_1 = require("./common/globalExceptions.handler");
const nestjs_prisma_1 = require("nestjs-prisma");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const host = configService.get('HOST') || 'localhost';
    const port = Number(configService.get('PORT') || '3000');
    const swaggerPath = configService.get('SWAGGER_PATH') || 'api-docs';
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ШильдикОнлайн')
        .setDescription('API')
        .setVersion('1.0')
        .addServer('http://localhost:3000', 'Local')
        .addServer('http://dev.shildik-online.ru:3000', 'Dev')
        .addServer('https://shildik-online.ru', 'Production')
        .addBearerAuth()
        .build();
    common_1.Logger.debug(`Swagger at http://${host}:${port}/${swaggerPath}`);
    const schema = swagger_1.SwaggerModule.createDocument(app, config);
    if (process.env.NODE_ENV === 'development') {
        swagger_1.SwaggerModule.setup(swaggerPath, app, schema);
    }
    app.enableShutdownHooks();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new globalExceptions_handler_1.GlobalExceptionFilter());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    if (process.env.NODE_ENV === 'development') {
        const prismaService = app.get(nestjs_prisma_1.PrismaService);
        prismaService.$on('query', (e) => {
            common_1.Logger.debug(e);
        });
    }
    await app.listen(port);
}
bootstrap().catch((e) => console.log("Server can't run", e));
//# sourceMappingURL=main.js.map