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
exports.SaleOffController = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("../shared/cloudinary/storage");
const guard_1 = require("../shared/guard");
const res_interceptor_1 = require("../shared/interceptor/res.interceptor");
const sale_off_service_1 = require("./sale-off.service");
const createSaleOff_dto_1 = require("./dto/createSaleOff.dto");
const editSaleOff_dto_1 = require("./dto/editSaleOff.dto");
let SaleOffController = class SaleOffController {
    constructor(service) {
        this.service = service;
    }
    createSaleOff(body) {
        return this.service.createSaleOff(body);
    }
    editSaleOff(body) {
        return this.service.editSaleOff(body);
    }
    delete(id) {
        return this.service.delete(id);
    }
};
__decorate([
    (0, common_1.UseInterceptors)((0, storage_1.fileUpload)('image')),
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createSaleOff_dto_1.createSaleOffDto]),
    __metadata("design:returntype", void 0)
], SaleOffController.prototype, "createSaleOff", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Patch)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editSaleOff_dto_1.editSaleOffDto]),
    __metadata("design:returntype", void 0)
], SaleOffController.prototype, "editSaleOff", null);
__decorate([
    (0, common_1.Delete)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SaleOffController.prototype, "delete", null);
SaleOffController = __decorate([
    (0, common_1.UseInterceptors)(res_interceptor_1.TransResInterceptor),
    (0, common_1.Controller)('saleOff'),
    __metadata("design:paramtypes", [sale_off_service_1.SaleOffService])
], SaleOffController);
exports.SaleOffController = SaleOffController;
//# sourceMappingURL=sale-off.controller.js.map