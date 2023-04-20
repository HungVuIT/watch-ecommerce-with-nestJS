import { Module } from '@nestjs/common';
import { SaleOffController } from './sale-off.controller';
import { SaleOffService } from './sale-off.service';

@Module({
    controllers: [SaleOffController],
    providers: [SaleOffService],
})
export class SaleOffModule {}
