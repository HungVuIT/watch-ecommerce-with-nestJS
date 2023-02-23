import { Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private pay: PaymentService){}
    
    @Get('')
    gngkt(){
        return this.pay.vnPay()
    }
}
