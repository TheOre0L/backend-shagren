import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async getNotification(
    @Req()
    req: Request & {
      user: {
        userId: string;
      };
    },
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.notificationService.get(req.user.userId, page, limit);
  }

  @Get('count')
  @UseGuards(AccessTokenGuard)
  async getNotificationCount(
    @Req()
    req: Request & {
      user: {
        userId: string;
      };
    },
  ) {
    return this.notificationService.getCount(req.user.userId);
  }
}
