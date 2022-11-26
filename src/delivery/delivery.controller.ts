import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { jwtGuard } from 'src/shared/guard';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private ghn: DeliveryService) {}

  @UseGuards(jwtGuard)
  @UseInterceptors(FileInterceptor(''))
  @Post()
  async getDelivery(
    @Body()
    body: {
      toProvince: string;
      toDistrict: string;
      toWard: string;
    },
  ) {

  }
}
