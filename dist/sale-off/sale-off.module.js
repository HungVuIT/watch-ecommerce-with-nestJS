"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleOffModule = void 0;
const common_1 = require("@nestjs/common");
const sale_off_controller_1 = require("./sale-off.controller");
const sale_off_service_1 = require("./sale-off.service");
let SaleOffModule = class SaleOffModule {
};
SaleOffModule = __decorate([
    (0, common_1.Module)({
        controllers: [sale_off_controller_1.SaleOffController],
        providers: [sale_off_service_1.SaleOffService],
    })
], SaleOffModule);
exports.SaleOffModule = SaleOffModule;
//# sourceMappingURL=sale-off.module.js.map