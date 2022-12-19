import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { jwtGuard } from 'src/shared/guard';
import { TransResInterceptor } from 'src/shared/interceptor/res.interceptor';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
@UseInterceptors(TransResInterceptor)
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
  ) {}
}
