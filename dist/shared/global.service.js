"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var globalVariables_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalVariables = void 0;
const common_1 = require("@nestjs/common");
let globalVariables = globalVariables_1 = class globalVariables {
    deleteUserInfor(userId) {
        delete globalVariables_1.deliveryLocation[userId];
        delete globalVariables_1.cartList[userId];
        delete globalVariables_1.paymentHost[userId];
        delete globalVariables_1.orderDetail[userId];
        delete globalVariables_1.other[userId];
    }
};
globalVariables.deliveryLocation = {};
globalVariables.cartList = {};
globalVariables.paymentHost = {};
globalVariables.orderDetail = {};
globalVariables.other = {};
globalVariables = globalVariables_1 = __decorate([
    (0, common_1.Injectable)()
], globalVariables);
exports.globalVariables = globalVariables;
//# sourceMappingURL=global.service.js.map