import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private ghn: DeliveryService) {}

  @UseInterceptors(FileInterceptor(""))
  @Post()
  async test(
    @Body()
    body: {
      fromProvince: string;
      toProvince: string;
      fromDistrict: string;
      toDistrict: string;
      toWard: string;
    },
  ) {
   return await this.ghn.getProvinceCode(body.fromProvince);

    // const fdcode = await this.ghn.getDistrictCode(fpcode, body.fromDistrict);

    // const tpcode = await this.ghn.getProvinceCode(body.toProvince);

    // const tdcode = await this.ghn.getDistrictCode(tpcode, body.toDistrict);

    // const twcode = await this.ghn.getWardCode(tdcode, body.toWard);

    // const fee = await this.ghn.getServices(
    //   Number(fdcode),
    //   Number(tdcode),
    //   Number(twcode),
    // );

    // return fee;
  }
}
