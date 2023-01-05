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
exports.RatingController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const enums_1 = require("@nestjs/common/enums");
const pipes_1 = require("@nestjs/common/pipes");
const platform_express_1 = require("@nestjs/platform-express");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_decorator_1 = require("../shared/customDecorator/user.decorator");
const guard_1 = require("../shared/guard");
const res_interceptor_1 = require("../shared/interceptor/res.interceptor");
const rating_service_1 = require("./rating.service");
class rateBody {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], rateBody.prototype, "targetID", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsIn)([1, 2, 3, 4, 5]),
    __metadata("design:type", Number)
], rateBody.prototype, "score", void 0);
let RatingController = class RatingController {
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    rateShop(userID, body) {
        this.ratingService.rateShop(userID, body.targetID, body.score);
        return enums_1.HttpStatus.OK;
    }
    updateRateShop(userID, body) {
        this.ratingService.updateRateShop(userID, body.targetID, body.score);
        return enums_1.HttpStatus.OK;
    }
    getRateShop(id) {
        return this.ratingService.getShopRate(id);
    }
    rateWatch(userID, body) {
        this.ratingService.rateProduct(userID, body.targetID, body.score);
        return enums_1.HttpStatus.OK;
    }
    updateRateWatch(userID, body) {
        this.ratingService.updateRateProduct(userID, body.targetID, body.score);
        return enums_1.HttpStatus.OK;
    }
    getRateWatch(id) {
        return this.ratingService.getProductRate(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Post)('shop'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rateBody]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "rateShop", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Patch)('shop'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rateBody]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "updateRateShop", null);
__decorate([
    (0, decorators_1.Get)('shop/:id'),
    __param(0, (0, decorators_1.Param)('id', pipes_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "getRateShop", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Post)('watch'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rateBody]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "rateWatch", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    (0, common_1.Patch)('watch'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rateBody]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "updateRateWatch", null);
__decorate([
    (0, decorators_1.Get)('watch/:id'),
    __param(0, (0, decorators_1.Param)('id', pipes_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "getRateWatch", null);
RatingController = __decorate([
    (0, decorators_1.UseInterceptors)(res_interceptor_1.TransResInterceptor),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.Controller)('rating'),
    __metadata("design:paramtypes", [rating_service_1.RatingService])
], RatingController);
exports.RatingController = RatingController;
//# sourceMappingURL=rating.controller.js.map