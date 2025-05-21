/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly log = new Logger(LocalStrategy.name);

  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(request: Request, email: string, password: string) {
    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const user = await authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    if (!user.isActive) {
      this.log.warn(`Пользователь ${user.id} отключен`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
