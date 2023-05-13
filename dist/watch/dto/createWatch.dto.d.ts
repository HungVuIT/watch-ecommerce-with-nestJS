import { Gender } from '@prisma/client';
export declare class createWatchDto {
    name: string;
    BID: number;
    CID: number[];
    sku: string;
    description: string;
    content: string;
    quantity: number;
    price: number;
    gender: Gender;
    materialCord: string;
    glassSurface: string;
    glassSize: string;
    weight: number;
    height: number;
    length: number;
    width: number;
    madeBy: string;
    image: any;
    warranty: string;
    isOld: boolean;
    status: string;
    include: string;
    used: string;
    resalePrice: number;
}
