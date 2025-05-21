import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { user } from '@prisma/client';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly configService;
    constructor(jwtService: JwtService, userService: UserService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<{
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
    } | null>;
    regist(userdto: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(user: user, login: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
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
    isUserActive(userId: string): Promise<boolean>;
    getTokens(user: user): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    updateTokens(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    setRefreshTokenCookie(res: Response, refreshToken: string): void;
    clearRefreshTokenCookie(res: Response): void;
    private _updateRefreshToken;
    getProfile(user: any): Promise<{
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
}
