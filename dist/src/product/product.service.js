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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const crypto_1 = require("crypto");
let ProductService = class ProductService {
    prisma;
    logger;
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger('ProductService');
    }
    async create(productCreateDto) {
        const { id, ...rest } = productCreateDto;
        const data = { ...rest, id: (0, crypto_1.randomUUID)() };
        const product = await this.prisma.product.create({
            data,
        });
        return {
            product,
            alert: {
                isActive: true,
                title: 'Продукт создан',
                message: `Продукт #${product.id} успешно создан и отображается в катологе`,
                type: 'bg-green-700',
            },
        };
    }
    async edit(productId, productUpdateDto) {
        return await this.prisma.product.update({
            data: productUpdateDto,
            where: { id: productId },
        });
    }
    async delete(productId) {
        return await this.prisma.product.delete({ where: { id: productId } });
    }
    async getProducts(filter) {
        switch (filter.action) {
            case 'findMany': {
                const productsId = filter.productId?.split(',') || [];
                return await this.prisma.product.findMany({
                    where: { id: { in: productsId } },
                });
            }
            case 'search': {
                return await this.prisma.product.findMany({
                    where: {
                        title: {
                            contains: filter.query,
                            mode: 'insensitive',
                        },
                    },
                    omit: { categoryid: true, materialid: true, typeid: true },
                    include: {
                        reviews: true,
                        material: true,
                        category: true,
                        type: true,
                        colors: true,
                    },
                });
            }
            case 'find': {
                return await this.prisma.product.findUnique({
                    where: { id: filter.productId },
                    omit: { categoryid: true, materialid: true, typeid: true },
                    include: {
                        reviews: true,
                        material: true,
                        category: true,
                        type: true,
                        colors: true,
                    },
                });
            }
            case 'all': {
                const offset = (Number(filter.page) - 1) * Number(filter.limit);
                const take = Number(filter.limit);
                console.log('Offset:', offset);
                console.log('Take:', take);
                const where = {};
                if (filter.category) {
                    where.categoryid = { in: filter.category.split(',') };
                }
                if (filter.color) {
                    where.colors = {
                        some: { id: { in: filter.color.split(',') } },
                    };
                }
                if (filter.minPrice || filter.maxPrice) {
                    where.price = {};
                    if (filter.minPrice)
                        where.price.gte = Number(filter.minPrice);
                    if (filter.maxPrice)
                        where.price.lte = Number(filter.maxPrice);
                }
                if (filter.inStock === true) {
                    where.count = { gt: 0 };
                }
                if (filter.isNew === true) {
                    where.isNew = true;
                }
                if (filter.isBestseller === true) {
                    where.isBestseller = true;
                }
                const orderBy = [];
                if (filter.sort === 'price-asc') {
                    orderBy.push({ price: 'asc' });
                }
                else if (filter.sort === 'price-desc') {
                    orderBy.push({ price: 'desc' });
                }
                else if (filter.sort === 'rating') {
                    orderBy.push({ rating: 'desc' });
                }
                else if (filter.sort === 'new') {
                    orderBy.push({ isNew: 'desc' });
                }
                else {
                    orderBy.push({ isBestseller: 'desc' });
                }
                console.log('Where Filters (no price filter):', where);
                const [products, total] = await Promise.all([
                    this.prisma.product.findMany({
                        skip: offset,
                        take,
                        where,
                        orderBy,
                        include: {
                            material: true,
                            category: true,
                            type: true,
                            colors: true,
                        },
                    }),
                    this.prisma.product.count({ where }),
                ]);
                console.log('Products (no price filter):', products);
                const productsColor = await this.prisma.color.findMany({});
                const productCategories = await this.prisma.category.findMany({});
                const productMaterial = await this.prisma.material.findMany({});
                return {
                    products,
                    categoryes: productCategories,
                    colors: productsColor,
                    materials: productMaterial,
                    total,
                };
            }
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map