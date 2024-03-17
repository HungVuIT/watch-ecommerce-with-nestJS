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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("../shared/cloudinary/storage");
const guard_1 = require("../shared/guard");
const res_interceptor_1 = require("../shared/interceptor/res.interceptor");
const createProduct_dto_1 = require("./dto/createProduct.dto");
const updateProduct_dto_1 = require("./dto/updateProduct.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    createProduct(req, body, file) {
        return this.productService.create(req.shop['id'], body, file);
    }
    editProduct(id, req, body, file) {
        return this.productService.update(id, body, file);
    }
    getList(query) {
        return this.productService.findMany(query);
    }
    deleteProduct(id) {
        return this.productService.delete(id);
    }
    getProduct(id) {
        return this.productService.findOne(id);
    }
    search(searchTxt) {
        return this.productService.search(searchTxt);
    }
};
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.VendorGuard),
    (0, common_1.UseInterceptors)((0, storage_1.filesUpload)('image', 8)),
    (0, common_1.Post)('/new'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createProduct_dto_1.createProductDto,
        Array]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.VendorGuard),
    (0, common_1.UseInterceptors)((0, storage_1.filesUpload)('image', 8)),
    (0, common_1.Patch)('/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, updateProduct_dto_1.updateProductDto,
        Array]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "editProduct", null);
__decorate([
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getList", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.VendorGuard),
    (0, common_1.Delete)('/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)('search/:value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "search", null);
ProductController = __decorate([
    (0, common_1.UseInterceptors)(res_interceptor_1.TransResInterceptor),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map