import { CloudinaryStorage } from 'multer-storage-cloudinary';
declare const storage: CloudinaryStorage;
export declare const fileUpload: (name: string) => import("@nestjs/common").Type<import("@nestjs/common").NestInterceptor<any, any>>;
export declare const filesUpload: (name: string, maxCount: number) => import("@nestjs/common").Type<import("@nestjs/common").NestInterceptor<any, any>>;
export declare const fileFieldsUpload: (name: {
    name: string;
    maxCount: number;
}[]) => import("@nestjs/common").Type<import("@nestjs/common").NestInterceptor<any, any>>;
export default storage;
