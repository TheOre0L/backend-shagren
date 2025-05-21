import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { UUID } from 'crypto';
import { Prisma } from '@prisma/client';

@Controller('category-product')
export class CategoryProductController {
  constructor(private readonly categoryService: CategoryProductService) {}

  @Post()
  add(@Body() categoryProductCreateDto: Prisma.categoryCreateInput) {
    return this.categoryService.add(categoryProductCreateDto);
  }

  @Patch()
  edit(
    @Query('categoryId', ParseUUIDPipe) categoryId: UUID,
    @Body() categoryProductUpdateDto: Prisma.categoryUpdateInput,
  ) {
    return this.categoryService.edit(categoryId, categoryProductUpdateDto);
  }

  @Delete()
  remove(@Query('categoryId', ParseUUIDPipe) categoryId: UUID) {
    return this.categoryService.remove(categoryId);
  }

  @Get()
  get(
    @Query('action') action: 'all' | 'one',
    @Query('categoryId', new ParseUUIDPipe({ optional: true }))
    categoryId?: UUID,
  ) {
    return this.categoryService.get(action, categoryId);
  }
}
