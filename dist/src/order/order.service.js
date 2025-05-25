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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const cdek_service_1 = require("../cdek/cdek.service");
const notification_service_1 = require("../notification/notification.service");
const external_1 = require("../payment/external");
const payment_service_1 = require("../payment/payment.service");
let OrderService = class OrderService {
    prisma;
    cdek;
    payment;
    notification;
    constructor(prisma, cdek, payment, notification) {
        this.prisma = prisma;
        this.cdek = cdek;
        this.payment = payment;
        this.notification = notification;
    }
    async createOrderFromCart(userId, body, res) {
        try {
            const cart = await this.prisma.cart.findUnique({
                where: { userId },
                include: { cartItems: true },
            });
            if (!cart || cart.cartItems.length === 0) {
                return res
                    .status(400)
                    .json({ message: 'Корзина пуста или не найдена' });
            }
            const totalSum = await cart.cartItems.reduce(async (totalPromise, item) => {
                const total = await totalPromise;
                const product = await this.prisma.product.findUnique({
                    where: { id: item.productId },
                    select: { price: true },
                });
                return product ? total + product.price * item.quantity : total;
            }, Promise.resolve(0));
            let order = await this.prisma.order.create({
                data: {
                    userId,
                    fio: `${body.firstName} ${body.lastName}`,
                    phone: body.phone,
                    summa: totalSum,
                    orderItems: {
                        create: cart.cartItems.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                    },
                },
            });
            await Promise.all(cart.cartItems.map((item) => this.prisma.product.update({
                where: { id: item.productId },
                data: {
                    count: {
                        decrement: item.quantity,
                    },
                },
            })));
            const paymentA = await this.payment.createPayment({
                amount: {
                    value: totalSum + body.rate.delivery_sum,
                    currency: external_1.CurrencyEnum.RUB,
                },
                description: `Оплата заказа №${order.id}, пользователь ${userId}`,
                payment_method_data: { type: external_1.PaymentMethodsEnum.yoo_money },
                capture: true,
                confirmation: {
                    type: 'redirect',
                    return_url: 'https://shagren.shop/thank',
                },
                metadata: { order_id: order.id },
            });
            const paydb = await this.prisma.payment.create({
                data: {
                    value: `${paymentA.amount.value}`,
                    currency: paymentA.amount.currency,
                    status: 'succeeded',
                    yooKassaId: paymentA.id,
                    description: paymentA.description,
                },
            });
            const items = cart.cartItems.map((item) => ({
                name: `Товар ${item.productId}`,
                ware_key: item.productId,
                quantity: item.quantity,
                price: totalSum / cart.cartItems.length,
                weight: item.quantity * 1000,
                amount: item.quantity,
                cost: (totalSum / cart.cartItems.length) * item.quantity,
                payment: { value: 0 },
            }));
            const deliveryData = {
                type: 1,
                number: order.id,
                tariff_code: body.rate.tariff_code,
                sender: {
                    company: 'ИП ШАГРЕНЬ',
                    name: 'Куценко Яков',
                    phones: [{ number: '+79197595502' }],
                },
                recipient: {
                    name: `${body.firstName} ${body.lastName}`,
                    phones: [{ number: `${body.phone}` }],
                },
                from_location: { code: 1079, address: 'ул. Краснопартизанская, д. 5' },
                to_location: {
                    code: body.address.city_code,
                    address: body.address.address,
                },
                packages: [
                    {
                        number: items[0].name,
                        weight: 1000,
                        items: items,
                    },
                ],
            };
            const delivery = await this.cdek.orderProcess('create', deliveryData, res);
            const deliverydb = await this.prisma.delivery.create({
                data: {
                    type: 'cdek',
                    deliveryServiceId: delivery?.data.entity?.uuid || '',
                    deliverySum: body.rate.delivery_sum,
                    city: body.address.city,
                    tariffCode: body.rate.tariff_code,
                    recipient: deliveryData.recipient,
                    toLocation: deliveryData.to_location,
                },
            });
            order = await this.prisma.order.update({
                where: { id: order.id },
                data: {
                    deliveryId: deliverydb.id,
                    paymentId: paydb.id,
                    summa: order.summa + deliverydb.deliverySum,
                },
            });
            if (!order.paymentId || !order.deliveryId) {
                await this.prisma.order.delete({ where: { id: order.id } });
                return res.status(500).json({ message: 'Ошибка создания заказа' });
            }
            await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
            console.log('Заказ успешно создан:', order, paymentA);
            return res.status(200).json({ order, payment: paymentA });
        }
        catch (error) {
            console.error('Ошибка создания заказа:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async getOrders() {
        return this.prisma.order.findMany({
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
        });
    }
    async updateOrder(orderId, status) {
        const order = await this.prisma.order.update({
            where: { id: orderId },
            data: { status: status },
            include: { orderItems: { include: { product: true } } },
        });
        if (status === 'delivered') {
            for (const item of order.orderItems) {
                await this.notification.create({
                    text: `Статус заказа #${orderId} с товаром "${item.product.title}" был доставлен, оцените его! Получите его в ПВЗ.`,
                    link: `https://shagren.shop/review/${item.productId}`,
                    title: 'Заказ доставлен!',
                    date: new Date(),
                    user: {
                        connect: { id: order.userId },
                    },
                }, order.userId);
            }
        }
        return await this.prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
                payment: true,
                delivery: true,
            },
        });
    }
    async cancelOrder(orderId) {
        const order = await this.prisma.order.findFirstOrThrow({
            where: { id: orderId },
            include: { payment: true, delivery: true },
        });
        const payment = order.payment;
        if (payment) {
            await this.payment.refundPayment({
                payment_id: payment.yooKassaId,
                description: `Возврат денег за отмену заказа #${orderId}`,
            });
        }
        await this.notification.create({
            text: `Заказ #${orderId} был отменен! Деньги были возвращены.`,
            link: 'https://shagren.shop/profile',
            title: 'Заказ отменён!',
            date: new Date(),
            user: {
                connect: {
                    id: order.userId,
                },
            },
        }, order.userId);
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'cancelled' },
        });
    }
    async getStats() {
        try {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            const orders = await this.prisma.order.findMany({
                where: {
                    createdAt: {
                        gte: oneMonthAgo,
                    },
                },
                select: {
                    id: true,
                    summa: true,
                    orderItems: {
                        select: {
                            productId: true,
                            quantity: true,
                        },
                    },
                },
            });
            const totalRevenue = orders.reduce((sum, order) => sum + Number(order.summa), 0);
            const totalOrders = orders.length;
            const averageCheck = totalOrders === 0 ? 0 : totalRevenue / totalOrders;
            const categories = await this.prisma.category.findMany({
                select: {
                    id: true,
                    title: true,
                    product: {
                        select: {
                            id: true,
                            title: true,
                            orderItems: {
                                where: {
                                    order: {
                                        createdAt: {
                                            gte: oneMonthAgo,
                                        },
                                    },
                                },
                                select: {
                                    quantity: true,
                                },
                            },
                        },
                    },
                },
            });
            const categoryStats = categories.map((category) => {
                const totalSales = category.product.reduce((sum, product) => {
                    const productSales = product.orderItems.reduce((acc, item) => acc + item.quantity, 0);
                    return sum + productSales;
                }, 0);
                return {
                    categoryId: category.id,
                    categoryTitle: category.title,
                    totalSales,
                };
            });
            return {
                totalRevenue,
                totalOrders,
                averageCheck,
                result: categoryStats,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.BadRequestException('Ошибка при получении статистики');
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        cdek_service_1.CdekService,
        payment_service_1.PaymentService,
        notification_service_1.NotificationService])
], OrderService);
//# sourceMappingURL=order.service.js.map