import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';
import { UUID } from 'crypto';
import { Prisma, user } from '@prisma/client';
import { LoginDto } from './app.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
export declare class AppController {
    private readonly appService;
    private readonly authService;
    private readonly configService;
    private readonly prisma;
    private logger;
    private uploadPath;
    constructor(appService: AppService, authService: AuthService, configService: ConfigService, prisma: PrismaService);
    hello(): string;
    uploadFile(file: Express.Multer.File): {
        message: string;
        filePath: string;
    };
    regist(req: Request & {
        user: user;
    }, res: Response, registData: any): Promise<void>;
    login(req: Request & {
        user: user;
    }, res: Response, _login: LoginDto): Promise<Response<any, Record<string, any>>>;
    refreshTokens(req: Request & {
        user: {
            userId: UUID;
            name: string;
            refreshToken: string;
        };
    }, res: Response): Promise<void>;
    getProfile(req: Request): Promise<{
        id: string;
        login: string;
        password: string;
        email: string;
        fio: string;
        city: string;
        view: boolean;
        role: number;
        telephone: string;
        refreshToken: string | null;
        isActive: boolean;
    }>;
    logout(req: Request & {
        user: {
            userId: UUID;
            name: string;
        };
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    clearRefreshToken(res: Response): Response<any, Record<string, any>>;
    setHomePage(body: Prisma.homePageUpdateInput): Prisma.Prisma__homePageClient<{
        id: number;
        title: string | null;
        subTitle: string | null;
        titleAbout: string | null;
        textAbout: string | null;
        desctiption: string | null;
        imageTitle: string | null;
        imageAbout: string | null;
        qrCodes: string | null;
        links: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    getHomePage(): Promise<{
        title: string | null;
        subTitle: string | null;
        titleAbout: string | null;
        textAbout: string | null;
        desctiption: string | null;
        imageTitle: string | null;
        imageAbout: string | null;
        qrCodes: string | null;
        links: string | null;
    } | null>;
}
