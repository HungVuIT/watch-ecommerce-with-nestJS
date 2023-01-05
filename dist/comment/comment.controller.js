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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const user_decorator_1 = require("../shared/customDecorator/user.decorator");
const guard_1 = require("../shared/guard");
const res_interceptor_1 = require("../shared/interceptor/res.interceptor");
const shared_service_1 = require("../shared/shared.service");
const comment_service_1 = require("./comment.service");
const comment_dto_1 = require("./dto/comment.dto");
let CommentController = class CommentController {
    constructor(service, tool) {
        this.service = service;
        this.tool = tool;
    }
    cmtOnWatch(id, body) {
        return this.service.cmtOnWatch(id, body);
    }
    getCmtOfWatch(id, query) {
        return this.service.getCmtOfWatch(id, query);
    }
    async deleteCmt(userId, commentId) {
        if (await this.tool.havePermisson(userId, commentId, 'comment'))
            return this.service.deleteCmt(commentId);
        else
            throw new common_1.HttpException("you don't own this comment", common_1.HttpStatus.FORBIDDEN);
    }
};
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, comment_dto_1.CommentDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "cmtOnWatch", null);
__decorate([
    (0, common_1.Get)(':watchId'),
    __param(0, (0, common_1.Param)('watchId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getCmtOfWatch", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteCmt", null);
CommentController = __decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseInterceptors)(res_interceptor_1.TransResInterceptor),
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService, shared_service_1.SharedService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map