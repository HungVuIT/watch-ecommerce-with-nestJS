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
exports.ShopController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const storage_1 = require("../shared/cloudinary/storage");
const shop_decorator_1 = require("../shared/customDecorator/shop.decorator");
const user_decorator_1 = require("../shared/customDecorator/user.decorator");
const guard_1 = require("../shared/guard");
const res_interceptor_1 = require("../shared/interceptor/res.interceptor");
const addressValidation_pipe_1 = require("../shared/pipe/addressValidation.pipe");
const createShop_dto_1 = require("./dto/createShop.dto");
const shop_service_1 = require("./shop.service");
let ShopController = class ShopController {
    constructor(shopService) {
        this.shopService = shopService;
    }
    createShop(id, body) {
        return this.shopService.create(id, body);
    }
    updateMyShop(id, body, files) {
        return this.shopService.updateByUserId(id, body, files);
    }
    updateShop(id, body, files) {
        return this.shopService.updateByShopId(id, body, files);
    }
    deleteShop(id) {
        return this.shopService.deleteByUserId(id);
    }
    listShop(query) {
        return this.shopService.findMany(query);
    }
    getShopById(id) {
        return this.shopService.findById(Number(id));
    }
    myShop(shop) {
        return shop;
    }
    addPayment(id, body) {
        return this.shopService.addPayment(id, body.email);
    }
};
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.Post)('my-shop'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)(new addressValidation_pipe_1.AddressPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, createShop_dto_1.createShopDto]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "createShop", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.VendorGuard),
    (0, common_1.UseInterceptors)((0, storage_1.fileFieldsUpload)([
        { name: 'logo', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
    ])),
    (0, common_1.Patch)('my-shop'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)(new addressValidation_pipe_1.AddressPipe())),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "updateMyShop", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.AdminGuard),
    (0, common_1.UseInterceptors)((0, storage_1.fileFieldsUpload)([
        { name: 'logo', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
    ])),
    (0, common_1.Patch)('/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(new addressValidation_pipe_1.AddressPipe())),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "updateShop", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.VendorGuard),
    (0, common_1.Delete)('my-shop'),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "deleteShop", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "listShop", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getShopById", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.VendorGuard),
    (0, common_1.Get)('my-shop'),
    __param(0, (0, shop_decorator_1.Shop)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "myShop", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.VendorGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.Post)('add-payment-method'),
    __param(0, (0, shop_decorator_1.Shop)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "addPayment", null);
ShopController = __decorate([
    (0, common_1.UseInterceptors)(res_interceptor_1.TransResInterceptor),
    (0, common_1.Controller)('shops'),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
exports.ShopController = ShopController;
//# sourceMappingURL=shop.controller.js.map