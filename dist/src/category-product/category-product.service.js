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
exports.CategoryProductService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let CategoryProductService = class CategoryProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async add(categoryProductCreateDto) {
        return await this.prisma.category.create({
            data: categoryProductCreateDto,
        });
    }
    async edit(categoryId, categoryProductUpdateDto) {
        try {
            return await this.prisma.category.update({
                data: categoryProductUpdateDto,
                where: { id: categoryId },
            });
        }
        catch (e) {
            console.error(e);
            throw new common_1.NotFoundException('Тип не найден');
        }
    }
    async remove(categoryId) {
        try {
            return await this.prisma.category.delete({
                where: { id: categoryId },
            });
        }
        catch (e) {
            console.error(e);
            throw new common_1.NotFoundException('Тип не найден');
        }
    }
    async get(action, categoryId) {
        switch (action) {
            case 'all': {
                return await this.prisma.category.findMany();
            }
            case 'one': {
                const categoryes = await this.prisma.category.findUnique({
                    where: { id: categoryId },
                });
                if (!categoryes) {
                    throw new common_1.NotFoundException('Категория не найдена');
                }
                return categoryes;
            }
            default: {
                throw new common_1.BadRequestException('Неизвестное действие');
            }
        }
    }
};
exports.CategoryProductService = CategoryProductService;
exports.CategoryProductService = CategoryProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], CategoryProductService);
//# sourceMappingURL=category-product.service.js.map