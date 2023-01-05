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
exports.WatchController = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("../shared/cloudinary/storage");
const guard_1 = require("../shared/guard");
const res_interceptor_1 = require("../shared/interceptor/res.interceptor");
const createWatch_dto_1 = require("./dto/createWatch.dto");
const updateWatch_dto_1 = require("./dto/updateWatch.dto");
const watch_service_1 = require("./watch.service");
let WatchController = class WatchController {
    constructor(watchService) {
        this.watchService = watchService;
    }
    createWatch(req, body, file) {
        return this.watchService.create(req.shop['id'], body, file);
    }
    editWatch(id, req, body, file) {
        return this.watchService.update(id, body, file);
    }
    getList(query) {
        return this.watchService.findMany(query);
    }
    deleteWatch(id) {
        return this.watchService.delete(id);
    }
    getWatch(id) {
        return this.watchService.findOne(id);
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
    __metadata("design:paramtypes", [Object, createWatch_dto_1.createWatchDto,
        Array]),
    __metadata("design:returntype", void 0)
], WatchController.prototype, "createWatch", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.VendorGuard),
    (0, common_1.UseInterceptors)((0, storage_1.filesUpload)('image', 8)),
    (0, common_1.Patch)('/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, updateWatch_dto_1.updateWatchDto, Array]),
    __metadata("design:returntype", void 0)
], WatchController.prototype, "editWatch", null);
__decorate([
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WatchController.prototype, "getList", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.VendorGuard),
    (0, common_1.Delete)('/id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WatchController.prototype, "deleteWatch", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WatchController.prototype, "getWatch", null);
WatchController = __decorate([
    (0, common_1.UseInterceptors)(res_interceptor_1.TransResInterceptor),
    (0, common_1.Controller)('watchs'),
    __metadata("design:paramtypes", [watch_service_1.WatchService])
], WatchController);
exports.WatchController = WatchController;
//# sourceMappingURL=watch.controller.js.map