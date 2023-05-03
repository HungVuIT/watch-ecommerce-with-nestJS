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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("../shared/cloudinary/storage");
const guard_1 = require("../shared/guard");
const res_interceptor_1 = require("../shared/interceptor/res.interceptor");
const category_service_1 = require("./category.service");
const createCategory_dto_1 = require("./dto/createCategory.dto");
const editCategory_dto_1 = require("./dto/editCategory.dto");
let CategoryController = class CategoryController {
    constructor(service) {
        this.service = service;
    }
    createCategory(body, file) {
        return this.service.createCategory(body, file);
    }
    editCategory(id, body, file) {
        return this.service.editCategory(id, body, file);
    }
    getList() {
        return this.service.getList();
    }
    getById(id) {
        return this.service.getById(id);
    }
    delete(id) {
        return this.service.delete(id);
    }
};
__decorate([
    (0, common_1.UseInterceptors)((0, storage_1.fileUpload)('image')),
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCategory_dto_1.createCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.UseInterceptors)((0, storage_1.fileUpload)('image')),
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.AdminGuard),
    (0, common_1.Patch)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, editCategory_dto_1.editCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "editCategory", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "delete", null);
CategoryController = __decorate([
    (0, common_1.UseInterceptors)(res_interceptor_1.TransResInterceptor),
    (0, common_1.Controller)('categorys'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map