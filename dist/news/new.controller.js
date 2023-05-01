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
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../shared/guard");
const res_interceptor_1 = require("../shared/interceptor/res.interceptor");
const new_service_1 = require("./new.service");
const createNew_dto_1 = require("./dto/createNew.dto");
const editNew_dto_1 = require("./dto/editNew.dto");
let NewsController = class NewsController {
    constructor(service) {
        this.service = service;
    }
    createNew(body) {
        return this.service.createNew(body);
    }
    editNew(id, body) {
        return this.service.editNew(id, body);
    }
    getList() {
        return this.service.getList();
    }
    getById(id) {
        return this.service.getById(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.AdminGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createNew_dto_1.createNewDto]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "createNew", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.AdminGuard),
    (0, common_1.Patch)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, editNew_dto_1.editNewDto]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "editNew", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "getById", null);
NewsController = __decorate([
    (0, common_1.UseInterceptors)(res_interceptor_1.TransResInterceptor),
    (0, common_1.Controller)('news'),
    __metadata("design:paramtypes", [new_service_1.NewsService])
], NewsController);
exports.NewsController = NewsController;
//# sourceMappingURL=new.controller.js.map