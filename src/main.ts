import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/globalExceptions.handler';
import { PrismaService } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const host: string = configService.get('HOST') || 'localhost';
  const port: number = Number(configService.get('PORT') || '3000');
  const swaggerPath: string = configService.get('SWAGGER_PATH') || 'api-docs';

  const config = new DocumentBuilder()
    .setTitle('ШильдикОнлайн')
    .setDescription('API')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local')
    .addServer('http://dev.shildik-online.ru:3000', 'Dev')
    .addServer('https://shildik-online.ru', 'Production')
    .addBearerAuth()
    .build();

  Logger.debug(`Swagger at http://${host}:${port}/${swaggerPath}`);

  const schema = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV === 'development') {
    SwaggerModule.setup(swaggerPath, app, schema);
  }

  // Слушаем shutdown hooks
  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Включаем автоматическое преобразование
      whitelist: true, // Удаляет лишние поля, не описанные в DTO
      forbidNonWhitelisted: true, // Выбрасывает ошибку, если есть лишние поля
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // log query events
  if (process.env.NODE_ENV === 'development') {
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.$on('query', (e) => {
      Logger.debug(e);
    });
  }

  await app.listen(port);
}

bootstrap().catch((e) => console.log("Server can't run", e));
