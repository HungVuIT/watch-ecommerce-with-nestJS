import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class AddressPipe implements PipeTransform<any> {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private checkAddress;
    private toValidate;
}
