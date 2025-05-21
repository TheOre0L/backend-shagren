import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from 'src/user/user.service';

import {
  AccessTokenStrategy,
  RefreshTokenStrategy,
} from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({ global: true })],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
