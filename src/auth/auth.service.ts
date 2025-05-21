/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { user } from '@prisma/client';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Функция аутентификации пользователя по логину-паролю
   *
   * @param email Email пользователя (логин)
   * @param pass Пароль
   *
   * @returns Объект Пользователь
   */
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmailWithCreds(email);
    console.log(user);
    if (user && (await argon2.verify(user.password, password))) {
      return user;
    }

    return null;
  }

  async regist(userdto: any) {
    const user = await this.userService.create(userdto);
    const tokens = await this.getTokens(user);
    await this._updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async login(user: user, login: any) {
    const User = await this.validateUser(login.email, login.password);
    const tokens = await this.getTokens(User as user);
    await this._updateRefreshToken((User as user).id, tokens.refreshToken);

    return tokens;
  }

  logout(userId: string) {
    return this.userService.update(userId, undefined);
  }

  async isUserActive(userId: string): Promise<boolean> {
    const maybeUser = await this.userService.findById(userId);
    return maybeUser && maybeUser.isActive;
  }

  async getTokens(
    user: user,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, name: user.fio, role: user.role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('auth.accessSecret'),
        expiresIn: this.configService.get<string>('auth.accessExpiresIn'),
      }),

      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('auth.refreshSecret'),
        expiresIn: this.configService.get<string>('auth.refreshExpiresIn'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findByIdWithCreds(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    if (refreshToken !== user.refreshToken) {
      await this.logout(userId);
      throw new ForbiddenException('Вы не авторизованы');
    }

    const tokens = await this.getTokens(user);
    await this._updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  setRefreshTokenCookie(res: Response, refreshToken: string): void {
    console.log('✅ Устанавливаем refreshToken:', refreshToken);

    const rtExpiresIn = this.configService.get<string>('auth.refreshExpiresIn');
    res.header('Access-Control-Allow-Credentials', 'true');

    res.cookie('refreshToken', refreshToken, {
      expires: new Date(
        new Date().getTime() + ms(rtExpiresIn as ms.StringValue),
      ),
      path: '/',
      httpOnly: true,
      // sameSite: 'strict', // Включить в проде
      // secure: true // Включить в проде (если HTTPS)
    });

    console.log('✅ Cookie установлены:', res.getHeaders()['set-cookie']);
  }

  clearRefreshTokenCookie(res: Response): void {
    res.clearCookie('refreshToken', {
      path: '/',
    });
  }

  private async _updateRefreshToken(userId: string, refreshToken: string) {
    // const hashedRefreshToken = await argon2.hash(refreshToken);
    const a = await this.userService.update(userId, refreshToken);

    console.log('????????????????', a, userId, refreshToken);
  }

  public async getProfile(user: any) {
    return this.userService.findById(user.id);
  }
}
