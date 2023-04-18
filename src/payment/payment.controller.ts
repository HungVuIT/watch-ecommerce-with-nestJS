import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private pay: PaymentService){}
    
}
