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
const user_decorator_1 = require("../shared/customDecorator/user.decorator");
const global_service_1 = require("../shared/global.service");
const guard_1 = require("../shared/guard");
const res_interceptor_1 = require("../shared/interceptor/res.interceptor");
const order_service_1 = require("./order.service");
const shop_decorator_1 = require("../shared/customDecorator/shop.decorator");
let OrderController = class OrderController {
    constructor(orderService, glo) {
        this.orderService = orderService;
        this.glo = glo;
    }
    getOrderListUser(id) {
        return this.orderService.getOrdersUser(id);
    }
    getOrderListAdmin() {
        return this.orderService.getOrdersAdmin();
    }
    getOrderListShop(id) {
        return this.orderService.getOrdersShop(id);
    }
    getOrderDetail(id) {
        return this.orderService.getOrderDetail(id);
    }
    updateOrder(id, body) {
        return this.orderService.updateOrder(id, body);
    }
    deleteOrder(id) {
        return this.orderService.deleteOrder(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Get)('/user'),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrderListUser", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Get)('/admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrderListAdmin", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.VendorGuard),
    (0, common_1.Get)('/shop'),
    __param(0, (0, shop_decorator_1.Shop)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrderListShop", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Get)('/order-detail/:orderId'),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrderDetail", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Patch)('/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.AdminGuard),
    (0, common_1.Delete)('/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "deleteOrder", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, common_1.UseInterceptors)(res_interceptor_1.TransResInterceptor),
    __metadata("design:paramtypes", [order_service_1.OrderService, global_service_1.globalVariables])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map