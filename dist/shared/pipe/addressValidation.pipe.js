"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressPipe = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const vn = require("sub-vn");
let AddressPipe = class AddressPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToInstance)(metatype, value);
        this.checkAddress(value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            throw new common_1.BadRequestException('Validation failed');
        }
        return value;
    }
    checkAddress(data) {
        let flag = true;
        let provinceCode = undefined;
        let districtCode = undefined;
        if (data.province) {
            flag = false;
            vn.getProvinces().forEach((item) => {
                if (item.name.includes(data.province)) {
                    data.province = item.name;
                    provinceCode = item.code;
                    flag = true;
                }
            });
            if (flag === false)
                throw new common_1.BadRequestException('Province not found');
        }
        if (data.district) {
            flag = false;
            vn.getDistrictsByProvinceCode(provinceCode).forEach((item) => {
                if (item.name.includes(data.district)) {
                    data.district = item.name;
                    flag = true;
                    districtCode = item.code;
                }
            });
            if (flag === false)
                throw new common_1.BadRequestException('District not found');
        }
        if (data.ward) {
            flag = false;
            vn.getWardsByDistrictCode(districtCode).forEach((item) => {
                if (item.name.includes(data.ward)) {
                    data.ward = item.name;
                    flag = true;
                }
            });
            if (flag === false)
                throw new common_1.BadRequestException('Ward not found');
        }
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
AddressPipe = __decorate([
    (0, common_1.Injectable)()
], AddressPipe);
exports.AddressPipe = AddressPipe;
//# sourceMappingURL=addressValidation.pipe.js.map