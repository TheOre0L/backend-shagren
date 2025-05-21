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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const nestjs_prisma_1 = require("nestjs-prisma");
let UserService = class UserService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(user) {
        const userExists = await this.prismaService.user.findFirst({
            where: {
                email: user.email,
                telephone: user.telephone,
            },
        });
        if (userExists) {
            throw new common_1.BadRequestException('Такой пользователь уже существует');
        }
        user.password = await argon2.hash(user.password);
        const newUser = await this.prismaService.user.create({ data: user });
        return newUser;
    }
    async update(id, refreshToken) {
        const user = await this.findById(id);
        if (!user)
            throw new Error('User not found');
        const update = await this.prismaService.user.update({
            where: { id },
            data: { refreshToken: refreshToken },
        });
        console.table(update);
        console.log('----------updateUser--------------', id, refreshToken);
        return update;
    }
    async delete(id) {
        await this.findById(id);
        return await this.prismaService.user.delete({ where: { id } });
    }
    async findById(id) {
        const findUser = await this.prismaService.user.findFirstOrThrow({
            where: { id },
            include: {
                order: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        delivery: true,
                        payment: true,
                        orderItems: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
                cart: {
                    include: {
                        cartItems: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
                review: true,
            },
        });
        return findUser;
    }
    async findByIdWithCreds(id) {
        const findUser = await this.prismaService.user.findFirstOrThrow({
            where: { id: id },
            omit: {
                password: false,
                refreshToken: false,
            },
        });
        return findUser;
    }
    async findByEmail(email) {
        const user = await this.prismaService.user.findFirstOrThrow({
            where: { email },
        });
        return user;
    }
    async findByEmailWithCreds(email) {
        const findUser = await this.prismaService.user.findFirstOrThrow({
            where: { email },
            omit: {
                password: false,
                refreshToken: false,
            },
        });
        return findUser;
    }
    async findAll(args = {
        where: {},
        skip: 0,
        take: 50,
    }) {
        return this.prismaService.user.findMany(args);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map