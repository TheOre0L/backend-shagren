import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';

import configuration from '../config/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CdekModule } from './cdek/cdek.module';
import { PaymentModule } from './payment/payment.module';
import { ShoppingCardModule } from './shopping-card/shopping-card.module';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeProductModule } from './type-product/type-product.module';
import { CategoryProductModule } from './category-product/category-product.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { NotificationModule } from './notification/notification.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './dist/uploads',
        filename: (req, file, cb) => {
          const filename = `${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
    ServeStaticModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const uploadsDir = config.get<string>('uploadPath')!;
        return [
          {
            serveRoot: '/uploads',
            rootPath: join(__dirname, '..', uploadsDir),
          },
        ];
      },
      inject: [ConfigService],
    }),
    PrismaModule.forRoot({
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
          errorFormat: 'minimal', // TODO: зависит от режима
          log: [
            { emit: 'event', level: 'query' },
            { emit: 'stdout', level: 'info' },
            { emit: 'stdout', level: 'warn' },
            { emit: 'stdout', level: 'error' },
          ],
        },
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'debug',
          }),
        ],
      },
    }),
    AuthModule,
    UserModule,
    OrderModule,
    ProductModule,
    CdekModule,
    PaymentModule,
    ShoppingCardModule,
    ReviewsModule,
    TypeProductModule,
    CategoryProductModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, ReviewsService, UserService],
})
export class AppModule {}
