import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
// import { RoleGuard } from 'src/auth/role/role.guard';
// import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleList } from 'src/auth/dto';
import { PrismaService } from 'nestjs-prisma';
import { FilterProduct } from './dto/product.filter';
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private prisma: PrismaService,
  ) {}

  @Post()
  // @UseGuards(RoleGuard)
  // @Roles([RoleList.ADMIN])
  create(@Body() productCreateDto: Prisma.productCreateInput) {
    return this.productService.create(productCreateDto);
  }
  @Patch()
  edit(
    @Query('productId', ParseUUIDPipe) productId: string,
    @Body() productEditDto: Prisma.productUpdateInput,
  ) {
    return this.productService.edit(productId, productEditDto);
  }
  @Delete()
  viewProduct(@Query('productId', ParseUUIDPipe) productId: string) {
    return this.productService.delete(productId);
  }
  @Get()
  getProducts(@Query() filter: FilterProduct) {
    return this.productService.getProducts(filter);
  }

  @Post('color')
  colorCreate(@Body() colorCreateDTO: Prisma.ColorCreateInput) {
    return this.prisma.color.create({ data: colorCreateDTO });
  }

  @Get('color')
  colorGet() {
    return this.prisma.color.findMany();
  }

  @Get('material')
  materialGet() {
    return this.prisma.material.findMany();
  }
}
