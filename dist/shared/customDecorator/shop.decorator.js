"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
const common_1 = require("@nestjs/common");
exports.Shop = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
        return request.shop[data];
    }
    return request.shop;
});
//# sourceMappingURL=shop.decorator.js.map