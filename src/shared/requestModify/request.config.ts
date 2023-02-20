import { Request } from 'express';

export interface tsRequest extends Request {
    user: any;
    shop: any;
}
