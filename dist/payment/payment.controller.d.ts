import { Request } from 'express';
import { PaymentService } from './payment.service';
export declare class PaymentController {
    private pay;
    constructor(pay: PaymentService);
    gngkt(): Promise<string>;
    gagrrg(req: Request): void;
}
