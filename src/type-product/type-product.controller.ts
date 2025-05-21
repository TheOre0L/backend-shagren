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
import { TypeProductService } from './type-product.service';
import { Prisma } from '@prisma/client';
import { TypeFilterDto } from './dto';
import { UUID } from 'crypto';

@Controller('type-product')
export class TypeProductController {
  constructor(private readonly typeProductService: TypeProductService) {}

  @Post()
  add(@Body() typeProductCreateDto: Prisma.typeCreateInput) {
    return this.typeProductService.add(typeProductCreateDto);
  }

  @Patch()
  edit(
    @Query('typeId', ParseUUIDPipe) typeId: UUID,
    @Body() typeProductUpdateDto: Prisma.typeUpdateInput,
  ) {
    return this.typeProductService.edit(typeId, typeProductUpdateDto);
  }

  @Delete()
  remove(@Query('typeId', ParseUUIDPipe) typeId: UUID) {
    return this.typeProductService.remove(typeId);
  }

  @Get()
  get(@Query() filter: TypeFilterDto) {
    return this.typeProductService.get(filter);
  }
}
