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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let DeliveryService = class DeliveryService {
    constructor(config, http) {
        this.config = config;
        this.http = http;
    }
    async getProvinceCode(province) {
        try {
            const headersRequest = {
                'Content-Type': 'application/json',
                token: this.config.get('GHN_TOKEN'),
            };
            const response = await (0, rxjs_1.firstValueFrom)(this.http
                .get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: headersRequest,
            })
                .pipe((0, rxjs_1.map)((response) => response.data)));
            let result;
            response['data'].forEach((element) => {
                if (element.NameExtension.includes(province))
                    result = element.ProvinceID;
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async getDistrictCode(provinceId, district) {
        try {
            const headersRequest = {
                'Content-Type': 'application/json',
                token: this.config.get('GHN_TOKEN'),
            };
            const response = await (0, rxjs_1.firstValueFrom)(this.http
                .get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=' + provinceId, { headers: headersRequest })
                .pipe((0, rxjs_1.map)((response) => response.data)));
            let result;
            response['data'].forEach((element) => {
                if (element.NameExtension.includes(district))
                    result = element.DistrictID;
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async getWardCode(districtId, ward) {
        try {
            const headersRequest = {
                'Content-Type': 'application/json',
                token: this.config.get('GHN_TOKEN'),
            };
            const response = await (0, rxjs_1.firstValueFrom)(this.http
                .get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=' + districtId, {
                headers: headersRequest,
            })
                .pipe((0, rxjs_1.map)((response) => response.data)));
            let result;
            response['data'].forEach((element) => {
                if (element.NameExtension.includes(ward))
                    result = element.WardCode;
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async getFee(from_district_code, to_district_code, to_ward_code, value, quantity, height, length, width, weight, option) {
        try {
            const headersRequest = {
                'Content-Type': 'application/json',
                token: this.config.get('GHN_TOKEN'),
                shop_id: this.config.get('GHN_ID'),
            };
            const body = {
                service_type_id: option,
                insurance_value: value,
                coupon: null,
                from_district_id: from_district_code,
                to_district_id: to_district_code,
                to_ward_code: to_ward_code,
                height: height * quantity,
                length: length,
                weight: weight * quantity,
                width: width,
            };
            const response = await (0, rxjs_1.firstValueFrom)(this.http
                .post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', JSON.stringify(body), { headers: headersRequest })
                .pipe((0, rxjs_1.map)((response) => response.data)));
            return response['data'];
        }
        catch (error) {
            throw error;
        }
    }
    async diliveryFee({ fromProvince = this.config.get('WAREHOUSE_PROVINCE'), fromDistrict = this.config.get('WAREHOUSE_DISTRICT'), toProvince, toDistrict, toWard, value, quantity = 1, height = 10, length = 15, width = 15, weight = 1000, option = 2, }) {
        const fpcode = await this.getProvinceCode(fromProvince);
        const fdcode = await this.getDistrictCode(fpcode, fromDistrict);
        const tpcode = await this.getProvinceCode(toProvince);
        const tdcode = await this.getDistrictCode(tpcode, toDistrict);
        const twcode = await this.getWardCode(tdcode, toWard);
        const fee = await this.getFee(Number(fdcode), Number(tdcode), twcode, value, quantity, height, length, width, weight, option);
        return fee.total;
    }
};
DeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, axios_1.HttpService])
], DeliveryService);
exports.DeliveryService = DeliveryService;
//# sourceMappingURL=delivery.service.js.map