import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as vn from 'sub-vn';

@Injectable()
export class AddressPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);

        this.checkAddress(value);

        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private checkAddress(data: { province: string; district: string; ward: string; [index: string]: any }): void {
        let flag: boolean = true;
        let provinceCode: number = undefined;
        let districtCode: number = undefined;

        // Kiểm tra và format lại tên tỉnh
        if (data.province) {
            flag = false;

            vn.getProvinces().forEach((item) => {
                if ((item.name as string).includes(data.province)) {
                    data.province = item.name;

                    provinceCode = item.code;

                    flag = true;
                }
            });

            if (flag === false) throw new BadRequestException('Province not found');
        }

        // Kiểm tra và format lại  trên thành phố
        if (data.district) {
            flag = false;

            vn.getDistrictsByProvinceCode(provinceCode).forEach((item) => {
                if ((item.name as string).includes(data.district)) {
                    data.district = item.name;

                    flag = true;

                    districtCode = item.code;
                }
            });

            if (flag === false) throw new BadRequestException('District not found');
        }

        // Kiểm tra và format lại tên phường
        if (data.ward) {
            flag = false;

            vn.getWardsByDistrictCode(districtCode).forEach((item) => {
                if ((item.name as string).includes(data.ward)) {
                    data.ward = item.name;

                    flag = true;
                }
            });

            if (flag === false) throw new BadRequestException('Ward not found');
        }
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
