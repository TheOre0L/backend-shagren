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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let NotificationService = class NotificationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, userId) {
        await this.prisma.notification.create({ data });
        return this.prisma.notification.findMany({ where: { userId } });
    }
    async update(data, id, userId) {
        await this.prisma.notification.update({
            where: { id, userId },
            data,
        });
        return this.prisma.notification.findMany({ where: { userId } });
    }
    async delete(userId, id) {
        console.log("11111 ++++" + id);
        if (id && id.length > 0) {
            await this.prisma.notification.delete({
                where: {
                    id,
                },
            });
        }
        else {
            await this.prisma.notification.deleteMany({
                where: {
                    userId,
                },
            });
        }
        return this.prisma.notification.findMany({ where: { userId } });
    }
    async getCount(userId) {
        const [notificationCount, cart] = await Promise.all([
            this.prisma.notification.count({ where: { userId } }),
            this.prisma.cart.findUnique({
                where: { userId },
                include: {
                    _count: {
                        select: { cartItems: true },
                    },
                },
            }),
        ]);
        const cartItemsCount = cart?._count.cartItems ?? 0;
        return { notificationCount, cartItemsCount };
    }
    async get(userId, page, limit) {
        const offset = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const [notifications, total] = await Promise.all([
            this.prisma.notification.findMany({
                where: { userId: userId },
                take,
                skip: offset,
            }),
            this.prisma.notification.count({ where: { userId: userId } }),
        ]);
        return {
            notifications,
            total,
        };
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map