import { Gender } from '@prisma/client';
export declare class updateWatchDto {
    name: string;
    BID: number;
    CID: number[];
    sku: string;
    description: string;
    content: string;
    quantity: number;
    price: number;
    priceFloor: number;
    gender: Gender;
    materialCord: string;
    glassSurface: string;
    glassSize: string;
    weight: number;
    madeBy: string;
    image: any;
    isOld: boolean;
    status: string;
    include: string;
    used: string;
    resalePrice: number;
}
