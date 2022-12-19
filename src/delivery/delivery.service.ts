import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class DeliveryService {
  constructor(private config: ConfigService, private http: HttpService) {}

  async getProvinceCode(province: string) {
    try {
      const headersRequest = {
        'Content-Type': 'application/json', // afaik this one is not needed
        token: this.config.get('GHN_TOKEN'),
      };

      const response = await firstValueFrom(
        this.http
          .get(
            'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
            { headers: headersRequest },
          )
          .pipe(map((response) => response.data)),
      );

      let result: string;

      response['data'].forEach((element: any) => {
        if (element.NameExtension.includes(province))
          result = element.ProvinceID;
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getDistrictCode(provinceId: string, district: string) {
    try {
      const headersRequest = {
        'Content-Type': 'application/json', // afaik this one is not needed
        token: this.config.get('GHN_TOKEN'),
      };

      const response = await firstValueFrom(
        this.http
          .get(
            'https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=' +
              provinceId,
            { headers: headersRequest },
          )
          .pipe(map((response) => response.data)),
      );

      let result: string;

      response['data'].forEach((element: any) => {
        if (element.NameExtension.includes(district))
          result = element.DistrictID;
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getWardCode(districtId: string, ward: string) {
    try {
      const headersRequest = {
        'Content-Type': 'application/json', // afaik this one is not needed
        token: this.config.get('GHN_TOKEN'),
      };

      const response = await firstValueFrom(
        this.http
          .get(
            'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=' +
              districtId,
            { headers: headersRequest },
          )
          .pipe(map((response) => response.data)),
      );

      let result: string;

      response['data'].forEach((element: any) => {
        if (element.NameExtension.includes(ward)) result = element.WardCode;
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getFee(
    from_district_code: number,
    to_district_code: number,
    to_ward_code: string,

    value: number,
    quantity: number,
    height: number,
    length: number,
    width: number,
    weight: number,
    option: number,
  ) {
    try {
      const headersRequest = {
        'Content-Type': 'application/json', // afaik this one is not needed
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

      const response = await firstValueFrom(
        this.http
          .post(
            'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
            JSON.stringify(body),
            { headers: headersRequest },
          )
          .pipe(map((response) => response.data)),
      );

      return response['data'];
    } catch (error) {
      throw error;
    }
  }

  async diliveryFee({
    fromProvince = this.config.get('WAREHOUSE_PROVINCE'),
    fromDistrict = this.config.get('WAREHOUSE_DISTRICT'),
    toProvince,
    toDistrict,
    toWard,
    value,
    quantity = 1,
    height = 10,
    length = 15,
    width = 15,
    weight = 1000,
    option = 2,
  }: {
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
  }): Promise<number> {
    const fpcode = await this.getProvinceCode(fromProvince);

    const fdcode = await this.getDistrictCode(fpcode, fromDistrict);

    const tpcode = await this.getProvinceCode(toProvince);

    const tdcode = await this.getDistrictCode(tpcode, toDistrict);

    const twcode = await this.getWardCode(tdcode, toWard);

    const fee = await this.getFee(
      Number(fdcode),
      Number(tdcode),
      twcode,
      value,
      quantity,
      height,
      length,
      width,
      weight,
      option,
    );

    return fee.total;
  }
}
