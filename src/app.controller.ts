/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Controller,
  Req,
  Get,
  Post,
  Patch,
  UseGuards,
  HttpCode,
  Body,
  Res,
  UnauthorizedException,
  Logger,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import {
  AccessTokenGuard,
  RefreshTokenGuard,
} from './auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { UUID } from 'crypto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Prisma, user } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';
import { LoginDto, TokensResponseDto } from './app.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';

// TODO: описать API
@Controller()
export class AppController {
  private logger: Logger;
  private uploadPath: string;
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.logger = new Logger('AppController');
  }

  @Get()
  hello() {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.handleFileUpload(file);
  }

  @Post('regist')
  async regist(
    @Req()
    req: Request & { user: user },
    @Res() res: Response,
    @Body() registData: any,
  ) {
    const user = this.authService.regist(registData);
    res.send(user);
  }

  @Throttle({
    short: { limit: 1, ttl: 1000 },
    long: { limit: 2, ttl: 60000 },
  })
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Вход' })
  @ApiOkResponse({ type: TokensResponseDto })
  async login(
    @Req()
    req: Request & { user: user },
    @Res() res: Response,
    @Body() _login: LoginDto,
  ) {
    const tokens = await this.authService.login(req.user, _login);
    this.authService.setRefreshTokenCookie(res, tokens.refreshToken);
    return res.send(tokens);
  }

  @Get('refreshTokens')
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  async refreshTokens(
    @Req()
    req: Request & {
      user: {
        userId: UUID;
        name: string;
        refreshToken: string;
      };
    },
    @Res() res: Response,
  ) {
    const {
      user: { userId, refreshToken },
    } = req;
    try {
      const tokens = await this.authService.updateTokens(userId, refreshToken);
      this.authService.setRefreshTokenCookie(res, tokens.refreshToken);
      res.send(tokens);
    } catch (e) {
      this.logger.error(e);
      // this.authService.clearRefreshTokenCookie(res);
      // throw new UnauthorizedException('Access denied');
    }
  }

  @Get('profile')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async getProfile(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.authService.getProfile(req.user);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  async logout(
    @Req()
    req: Request & {
      user: {
        userId: UUID;
        name: string;
      };
    },
    @Res() res: Response,
  ) {
    await this.authService.logout(req.user.userId);
    this.authService.clearRefreshTokenCookie(res);
    return res.send();
  }

  @Get('clear')
  @HttpCode(200)
  clearRefreshToken(@Res() res: Response) {
    this.authService.clearRefreshTokenCookie(res);
    return res.send();
  }

  @Patch('home')
  setHomePage(@Body() body: Prisma.homePageUpdateInput) {
    return this.prisma.homePage.update({
      where: { id: 1 },
      data: { ...body },
    });
  }
  @Get('home')
  async getHomePage() {
    const homePage = await this.prisma.homePage.findUnique({
      where: { id: 1 },
    });
    if (homePage) {
      const { id, ...dataWithoutId } = homePage; // Exclude the id
      return dataWithoutId;
    }
    return null;
  }
}
