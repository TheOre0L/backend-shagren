/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import * as ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { user } from '@prisma/client';

import { UserService } from '../user/user.service';
import { LoginDTO, RegistrationDTO } from 'src/user/dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RecoverPasswordDto } from 'src/app.controller';

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
    if (user && (await argon2.verify(user.password, password))) {
      return user;
    }

    return null;
  }

  async regist(userdto: RegistrationDTO) {
    try {
      const user = await this.userService.create(userdto);
      const tokens = await this.getTokens(user);
      await this._updateRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (e) {
      if (e instanceof BadRequestException) {
        // Ошибка уже подготовлена — просто перекидываем дальше
        throw e;
      }

      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        const fields = Array.isArray(e.meta?.target)
          ? (e.meta.target as string[]).join(', ')
          : String(e.meta?.target);
        throw new BadRequestException(
          `Пользователь с таким(и) полем(ями) «${fields}» уже существует`,
        );
      }

      console.error(e);
      throw new InternalServerErrorException(
        'Произошла непредвиденная ошибка при регистрации',
      );
    }
  }

  async login(user: user, login: LoginDTO) {
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

    return { tokens, accept: user.role === 1 || user.role === 0 };
  }

  async recoverPas(user: user, _data: RecoverPasswordDto) {
    if (_data.newpas.length < 6) {
      throw new BadRequestException(`Слишком короткий пароль`);
    }
    const User = await this.userService.findByIdWithPas(user.id);
    console.log(User, _data, '_________________________________');
    if (User && (await argon2.verify(User.password, _data.pas))) {
      const hash = await argon2.hash(_data.newpas);
      return this.userService.updateUser(User.id, { password: hash });
    } else {
      throw new BadRequestException(`Текущий пароль не верный`);
    }
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

  public async getProfile(user: string) {
    console.table(await this.userService.findById(user));
    return await this.userService.findById(user);
  }
}
