import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { TypeFilterDto, TypeResponseDto } from './dto';
import { UUID } from 'crypto';

@Injectable()
export class TypeProductService {
  constructor(private prisma: PrismaService) {}

  async add(
    typeProductCreateDto: Prisma.typeCreateInput,
  ): Promise<TypeResponseDto> {
    return await this.prisma.type.create({ data: typeProductCreateDto });
  }

  async edit(
    typeId: UUID,
    typeProductUpdateDto: Prisma.typeUpdateInput,
  ): Promise<TypeResponseDto> {
    try {
      return await this.prisma.type.update({
        data: typeProductUpdateDto,
        where: { id: typeId },
      });
    } catch (e) {
      console.error(e);
      throw new NotFoundException('Тип не найден');
    }
  }

  async remove(typeId: UUID): Promise<TypeResponseDto> {
    try {
      return await this.prisma.type.delete({
        where: { id: typeId },
      });
    } catch (e) {
      console.error(e);
      throw new NotFoundException('Тип не найден');
    }
  }

  async get(filter: TypeFilterDto) {
    const { action } = filter;
    switch (action) {
      case 'all': {
        return await this.prisma.type.findMany({});
      }
      case 'findForType': {
        const { typeId } = filter;
        if (!typeId) {
          throw new BadRequestException('@param - typeId не указан');
        }
        return await this.prisma.type.findMany({
          where: { id: typeId },
        });
      }
      default: {
        throw new BadRequestException('Неизвестное действие');
      }
    }
  }
}
