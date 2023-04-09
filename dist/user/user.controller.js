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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("../shared/cloudinary/storage");
const user_decorator_1 = require("../shared/customDecorator/user.decorator");
const guard_1 = require("../shared/guard");
const res_interceptor_1 = require("../shared/interceptor/res.interceptor");
const addressValidation_pipe_1 = require("../shared/pipe/addressValidation.pipe");
const user_dto_1 = require("./dto/user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getMe(user) {
        delete user['password'];
        return user;
    }
    getUserById(id) {
        return this.userService.getUserById(id);
    }
    getList(query) {
        return this.userService.getList(query);
    }
    editMe(id, body, file) {
        return this.userService.editMe(id, body, file);
    }
    editUser(id, body, file) {
        return this.userService.editMe(id, body, file);
    }
    delete(id) {
        return this.userService.delete(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getList", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Patch)('me'),
    (0, common_1.UseInterceptors)((0, storage_1.fileUpload)('avatar')),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)(new addressValidation_pipe_1.AddressPipe())),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.userDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "editMe", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.AdminGuard),
    (0, common_1.Patch)('/id/:id'),
    (0, common_1.UseInterceptors)((0, storage_1.fileUpload)('avatar')),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(new addressValidation_pipe_1.AddressPipe())),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.userDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "editUser", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard, guard_1.AdminGuard),
    (0, common_1.Delete)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Controller)('users'),
    (0, common_1.UseInterceptors)(res_interceptor_1.TransResInterceptor),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map