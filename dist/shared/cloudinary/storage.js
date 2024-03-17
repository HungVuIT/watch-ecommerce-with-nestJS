"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFieldsUpload = exports.filesUpload = exports.fileUpload = void 0;
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const config = new config_1.ConfigService();
cloudinary_1.v2.config({
    cloud_name: config.get('CLOUDINARY_NAME'),
    api_key: config.get('CLOUDINARY_KEY'),
    api_secret: config.get('CLOUDINARY_SECRET'),
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, file) => {
        const uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/gi, '');
        return {
            folder: 'product-ecommerce',
            format: 'jpeg',
            public_id: uniqFileName,
        };
    },
});
const fileUpload = (name) => {
    return (0, platform_express_1.FileInterceptor)(name, { storage: storage });
};
exports.fileUpload = fileUpload;
const filesUpload = (name, maxCount) => {
    return (0, platform_express_1.FilesInterceptor)(name, maxCount, { storage: storage });
};
exports.filesUpload = filesUpload;
const fileFieldsUpload = (name) => {
    return (0, platform_express_1.FileFieldsInterceptor)(name, { storage: storage });
};
exports.fileFieldsUpload = fileFieldsUpload;
exports.default = storage;
//# sourceMappingURL=storage.js.map