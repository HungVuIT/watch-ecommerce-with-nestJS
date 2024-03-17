import { ConfigService } from '@nestjs/config';
import { DeliveryService } from 'src/delivery/delivery.service';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { globalVariables } from 'src/shared/global.service';
interface Cart {
    id: number;
    quantity: number;
    PID: number;
    UID: number;
    SID: number;
    name: string;
    price: number;
    productQuantity: number;
    paypalMethod: string;
}
interface CartGroupedByShop {
    SID: number;
    items: Cart[];
}
export interface OrderByShop extends CartGroupedByShop {
    itemPrice: number;
    shipFee: number;
    totalPrice: number;
    code: string;
}
export declare class OrderService {
    private prisma;
    private payment;
    private delivery;
    private config;
    private glo;
    constructor(prisma: PrismaService, payment: PaymentService, delivery: DeliveryService, config: ConfigService, glo: globalVariables);
    getOrdersUser(id: number): Promise<({
        Order_detail: (import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            OID: number;
            PID: number;
            quantity: number;
            total: number;
            fee: number;
        }, unknown, never> & {})[];
        shop: import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            content: string;
            province: string;
            district: string;
            ward: string;
            address: string;
            email: string;
            phoneNumber: string;
            logo: string;
            banner: string;
            UID: number;
            isActive: boolean;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        status: import(".prisma/client").orderProcess;
        total: number;
        paymentMethod: import(".prisma/client").paymentMethod;
        UID: number;
        SID: number;
        Note: string;
        userPay: boolean;
        payVendor: boolean;
        isActive: boolean;
    }, unknown, never> & {})[]>;
    getOrdersShop(id: number): Promise<({
        Order_detail: (import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            OID: number;
            PID: number;
            quantity: number;
            total: number;
            fee: number;
        }, unknown, never> & {})[];
        shop: import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            content: string;
            province: string;
            district: string;
            ward: string;
            address: string;
            email: string;
            phoneNumber: string;
            logo: string;
            banner: string;
            UID: number;
            isActive: boolean;
        }, unknown, never> & {};
        user: import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            password: string;
            email: string;
            phoneNumber: string;
            firstName: string;
            lastName: string;
            province: string;
            district: string;
            ward: string;
            address: string;
            gender: import(".prisma/client").Gender;
            birthDay: Date;
            avatar: string;
            status: boolean;
            role: import(".prisma/client").Role;
            isActive: boolean;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        status: import(".prisma/client").orderProcess;
        total: number;
        paymentMethod: import(".prisma/client").paymentMethod;
        UID: number;
        SID: number;
        Note: string;
        userPay: boolean;
        payVendor: boolean;
        isActive: boolean;
    }, unknown, never> & {})[]>;
    getOrdersAdmin(): Promise<({
        Order_detail: (import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            OID: number;
            PID: number;
            quantity: number;
            total: number;
            fee: number;
        }, unknown, never> & {})[];
        shop: import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            content: string;
            province: string;
            district: string;
            ward: string;
            address: string;
            email: string;
            phoneNumber: string;
            logo: string;
            banner: string;
            UID: number;
            isActive: boolean;
        }, unknown, never> & {};
        user: import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            password: string;
            email: string;
            phoneNumber: string;
            firstName: string;
            lastName: string;
            province: string;
            district: string;
            ward: string;
            address: string;
            gender: import(".prisma/client").Gender;
            birthDay: Date;
            avatar: string;
            status: boolean;
            role: import(".prisma/client").Role;
            isActive: boolean;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        status: import(".prisma/client").orderProcess;
        total: number;
        paymentMethod: import(".prisma/client").paymentMethod;
        UID: number;
        SID: number;
        Note: string;
        userPay: boolean;
        payVendor: boolean;
        isActive: boolean;
    }, unknown, never> & {})[]>;
    getOrderDetail(orderId: number): Promise<({
        product: import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            BID: number;
            SID: number;
            CID: number;
            sku: string;
            description: string;
            content: string;
            isHome: boolean;
            saled: number;
            quantity: number;
            price: number;
            estimatedPrice: number;
            image: string[];
            isActive: boolean;
        }, unknown, never> & {};
        order: {
            shop: import("@prisma/client/runtime").GetResult<{
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                content: string;
                province: string;
                district: string;
                ward: string;
                address: string;
                email: string;
                phoneNumber: string;
                logo: string;
                banner: string;
                UID: number;
                isActive: boolean;
            }, unknown, never> & {};
            user: import("@prisma/client/runtime").GetResult<{
                id: number;
                createdAt: Date;
                updatedAt: Date;
                username: string;
                password: string;
                email: string;
                phoneNumber: string;
                firstName: string;
                lastName: string;
                province: string;
                district: string;
                ward: string;
                address: string;
                gender: import(".prisma/client").Gender;
                birthDay: Date;
                avatar: string;
                status: boolean;
                role: import(".prisma/client").Role;
                isActive: boolean;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import(".prisma/client").orderProcess;
            total: number;
            paymentMethod: import(".prisma/client").paymentMethod;
            UID: number;
            SID: number;
            Note: string;
            userPay: boolean;
            payVendor: boolean;
            isActive: boolean;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        OID: number;
        PID: number;
        quantity: number;
        total: number;
        fee: number;
    }, unknown, never> & {})[]>;
    updateOrder(id: number, body: any): Promise<void>;
    deleteOrder(id: number): Promise<void>;
    private generateOrderCode;
}
export {};
