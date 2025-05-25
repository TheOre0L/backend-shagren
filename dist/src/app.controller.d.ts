import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';
import { UUID } from 'crypto';
import { Prisma, user } from '@prisma/client';
import { LoginDto } from './app.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { RegistrationDTO } from './user/dto';
import { UserService } from './user/user.service';
export declare class RecoverPasswordDto {
    pas: string;
    newpas: string;
}
export declare class AppController {
    private readonly appService;
    private readonly authService;
    private readonly userService;
    private readonly configService;
    private readonly prisma;
    private logger;
    private uploadPath;
    constructor(appService: AppService, authService: AuthService, userService: UserService, configService: ConfigService, prisma: PrismaService);
    hello(): string;
    uploadFile(file: Express.Multer.File): {
        message: string;
        filePath: string;
    };
    regist(registData: RegistrationDTO, res: Response): Promise<Response<any, Record<string, any>>>;
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
    recoverPas(req: Request & {
        user: user;
    }, _data: RecoverPasswordDto): Promise<{
        id: string;
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
    settings(data: any, req: Request & {
        user: {
            userId: UUID;
        };
    }): Promise<{
        id: string;
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
    getProfile(req: Request & {
        user: {
            userId: UUID;
            name: string;
        };
    }): Promise<{
        id: string;
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
        links: string | null;
        subTitle: string | null;
        titleAbout: string | null;
        textAbout: string | null;
        desctiption: string | null;
        imageTitle: string | null;
        imageAbout: string | null;
        qrCodes: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    getHomePage(): Promise<{
        title: string | null;
        links: string | null;
        subTitle: string | null;
        titleAbout: string | null;
        textAbout: string | null;
        desctiption: string | null;
        imageTitle: string | null;
        imageAbout: string | null;
        qrCodes: string | null;
    } | null>;
}
