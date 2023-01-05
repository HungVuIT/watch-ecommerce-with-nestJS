import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class DeliveryService {
    private config;
    private http;
    constructor(config: ConfigService, http: HttpService);
    getProvinceCode(province: string): Promise<string>;
    getDistrictCode(provinceId: string, district: string): Promise<string>;
    getWardCode(districtId: string, ward: string): Promise<string>;
    getFee(from_district_code: number, to_district_code: number, to_ward_code: string, value: number, quantity: number, height: number, length: number, width: number, weight: number, option: number): Promise<any>;
    diliveryFee({ fromProvince, fromDistrict, toProvince, toDistrict, toWard, value, quantity, height, length, width, weight, option, }: {
        fromProvince?: string;
        fromDistrict?: string;
        toProvince: string;
        toDistrict: string;
        toWard: string;
        value: number;
        quantity?: number;
        height?: number;
        length?: number;
        width?: number;
        weight?: number;
        option?: number;
    }): Promise<number>;
}
