import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class DeliveryService {
  constructor(private config: ConfigService, private http: HttpService) {}

  async getProvinceCode(province: string) {
    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      token: this.config.get('GHN_TOKEN'),
    };

    const response = await this.http
      .get(
        'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
        { headers: headersRequest },
      )
      .pipe(map((response) => response.data));

    return response['data'];

    response['data'].forEach((element: any) => {
      if (element.NameExtension.includes(province)) return element.ProvinceID;
    });

    return '';
  }

  async getDistrictCode(provinceId: string, district: string) {
    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      token: this.config.get('GHN_TOKEN'),
    };

    const response = await this.http
      .get(
        'https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=' +
          provinceId,
        { headers: headersRequest },
      )
      .pipe(map((response) => response.data));

    response['data'].forEach((element: any) => {
      if (element.NameExtension.includes(district)) return element.DistrictID;
    });

    return '';
  }

  async getWardCode(districtId: string, ward: string) {
    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      token: this.config.get('GHN_TOKEN'),
    };

    const response = await this.http
      .get(
        'https://online-gateway.ghn.vn/shiip/public-api/master-data/district?district_id=' +
          districtId,
        { headers: headersRequest },
      )
      .pipe(map((response) => response.data));

    response['data'].forEach((element: any) => {
      if (element.NameExtension.includes(ward)) return element.WardCode;
    });

    return '';
  }

  async getServices(
    from_district_code: number,
    to_district_code: number,
    to_ward_code: number,
  ) {
    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      token: this.config.get('GHN_TOKEN'),
      shop_id: this.config.get('GHN_ID'),
    };

    const body = {
      service_type_id: 2,
      insurance_value: 500000,
      coupon: null,
      from_district_id: from_district_code,
      to_district_id: to_district_code,
      to_ward_code: to_ward_code.toString(),
      height: 15,
      length: 15,
      weight: 1000,
      width: 15,
    };

    const response = await this.http
      .post(
        'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
        body,
        { headers: headersRequest },
      )
      .pipe(map((response) => response.data));

    return response['data'];
  }
}
