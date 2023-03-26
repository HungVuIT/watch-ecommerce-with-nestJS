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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const user_decorator_1 = require("../shared/customDecorator/user.decorator");
const global_service_1 = require("../shared/global.service");
const guard_1 = require("../shared/guard");
const res_interceptor_1 = require("../shared/interceptor/res.interceptor");
const createOrder_dto_1 = require("./dto/createOrder.dto");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(id, body, req) {
        global_service_1.globalVariables.deliveryLocation[id] = {
            address: body.address,
            deliveryOption: body.deliveryOption,
            district: body.district,
            province: body.province,
            ward: body.ward,
        };
        global_service_1.globalVariables.paymentHost[id] =
            process.env.NODE_ENV === 'production'
                ? 'https://dhwatch.onrender.com/api/order/' + id.toString()
                : 'http://localhost:8000/api/order/' + id.toString();
        if (body.paymentMethod === 'offline') {
            const order = await this.orderService.cashOnDelivery(id);
            return order;
        }
        const order = await this.orderService.createLinkPaymant(id);
        return order;
    }
    success(id, req) {
        global_service_1.globalVariables.other[id] = {
            payerId: req.query.PayerID,
            paymentId: req.query.paymentId,
        };
        return this.orderService.completeOrder(id);
    }
    getOrderList(id) {
        return this.orderService.getOrders(id);
    }
    getOrderDetail(id) {
        return this.orderService.getOrderDetail(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.Post)('/checkout'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, createOrder_dto_1.createOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)(':id/success'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "success", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Get)(''),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrderList", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Get)('/order-detail/:orderId'),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrderDetail", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, common_1.UseInterceptors)(res_interceptor_1.TransResInterceptor),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map