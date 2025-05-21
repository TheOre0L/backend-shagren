import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Prisma, product } from '@prisma/client';
import { ReviewsFilterDto } from './dto';
import { UUID } from 'crypto';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  add(
    @Body() reviewCreateDto: Prisma.reviewCreateInput,
    @Query('productId') productId: string,
    @Req()
    req: Request & {
      user: {
        userId: string;
      };
    },
  ) {
    return this.reviewsService.add(reviewCreateDto, productId, req.user.userId);
  }

  @Patch()
  edit(@Body() reviewUpdateDto: Prisma.reviewUpdateInput) {
    return this.reviewsService.edit(reviewUpdateDto);
  }

  @Delete()
  remove(@Query('reviewId', ParseUUIDPipe) reviewId: UUID) {
    return this.reviewsService.remove(reviewId);
  }

  @Get()
  get(@Query() filter: ReviewsFilterDto) {
    return this.reviewsService.get(filter);
  }
}
