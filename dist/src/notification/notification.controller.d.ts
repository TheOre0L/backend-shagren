import { NotificationService } from './notification.service';
import { Request } from 'express';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getNotification(req: Request & {
        user: {
            userId: string;
        };
    }, page: number, limit: number): Promise<{
        notifications: {
            id: string;
            userId: string;
            link: string;
            type: string;
            date: Date;
            text: string;
            status: string;
            orderId: string | null;
            productId: string | null;
            title: string | null;
        }[];
        total: number;
    }>;
    getNotificationCount(req: Request & {
        user: {
            userId: string;
        };
    }): Promise<{
        notificationCount: number;
        cartItemsCount: number;
    }>;
    delete(req: Request & {
        user: {
            userId: string;
        };
    }, id?: string): Promise<{
        id: string;
        userId: string;
        link: string;
        type: string;
        date: Date;
        text: string;
        status: string;
        orderId: string | null;
        productId: string | null;
        title: string | null;
    }[]>;
}
