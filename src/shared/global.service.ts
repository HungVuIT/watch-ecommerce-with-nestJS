import { Injectable } from '@nestjs/common';

@Injectable()
export class globalVariables {
  public static diliveryLocation: {
    [index: string]: {
      province: string;
      district: string;
      ward: string;
      address: string;
    };
  } = {};

  public static cartList: { [index: string]: any } = {};

  public static paymentTotal: { [index: string]: number } = {};

  public static paymentHost : { [index: string]: string } = {};

  public static other: { [index: string]: any } = {};
}
