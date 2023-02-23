import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private pay: PaymentService){}
    
    @Get('')
    gngkt(){
        return this.pay.VNPayCheckoutUrl()
    }

    @Get('return')
    gagrrg(@Req() req:Request){
        return this.pay.VNPayReturn(req)
    }
}
