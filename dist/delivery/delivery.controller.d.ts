import { DeliveryService } from './delivery.service';
export declare class DeliveryController {
    private ghn;
    constructor(ghn: DeliveryService);
    getDelivery(body: {
        toProvince: string;
        toDistrict: string;
        toWard: string;
    }): Promise<void>;
}
