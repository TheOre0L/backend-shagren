"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeProductService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let TypeProductService = class TypeProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async add(typeProductCreateDto) {
        return await this.prisma.type.create({ data: typeProductCreateDto });
    }
    async edit(typeId, typeProductUpdateDto) {
        try {
            return await this.prisma.type.update({
                data: typeProductUpdateDto,
                where: { id: typeId },
            });
        }
        catch (e) {
            console.error(e);
            throw new common_1.NotFoundException('Тип не найден');
        }
    }
    async remove(typeId) {
        try {
            return await this.prisma.type.delete({
                where: { id: typeId },
            });
        }
        catch (e) {
            console.error(e);
            throw new common_1.NotFoundException('Тип не найден');
        }
    }
    async get(filter) {
        const { action } = filter;
        switch (action) {
            case 'all': {
                return await this.prisma.type.findMany({});
            }
            case 'findForType': {
                const { typeId } = filter;
                if (!typeId) {
                    throw new common_1.BadRequestException('@param - typeId не указан');
                }
                return await this.prisma.type.findMany({
                    where: { id: typeId },
                });
            }
            default: {
                throw new common_1.BadRequestException('Неизвестное действие');
            }
        }
    }
};
exports.TypeProductService = TypeProductService;
exports.TypeProductService = TypeProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], TypeProductService);
//# sourceMappingURL=type-product.service.js.map