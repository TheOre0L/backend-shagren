import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { AuthService } from '../auth.service';
import { JwtPayload } from '../types/jwt.interface';

export const extractRefreshTokenFromCookies = (req: Request) => {
  const cookies = req.headers.cookie?.split('; ');

  if (!cookies?.length) {
    return null;
  }

  const refreshTokenCookie = cookies.find((cookie) =>
    cookie.startsWith(`refreshToken=`),
  );

  if (!refreshTokenCookie) {
    return null;
  }

  return refreshTokenCookie.split('=')[1];
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('auth.accessSecret')!,
    });
  }

  async validate(payload: JwtPayload) {
    if (!(await this.authService.isUserActive(payload.sub))) {
      throw new UnauthorizedException();
    }

    return { userId: payload.sub, name: payload.name, role: payload.role };
  }
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractRefreshTokenFromCookies(req),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('auth.refreshSecret')!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    if (!(await this.authService.isUserActive(payload.sub))) {
      throw new UnauthorizedException();
    }

    const refreshToken: string = extractRefreshTokenFromCookies(req)!;

    return { userId: payload.sub, name: payload.name, refreshToken };
  }
}
