import { ConfigService } from '@nestjs/config';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const config = new ConfigService();

cloudinary.config({
  cloud_name: config.get('CLOUDINARY_NAME'),
  api_key: config.get('CLOUDINARY_KEY'),
  api_secret: config.get('CLOUDINARY_SECRET'),
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/gi, '');

    return {
      folder: 'watch-ecommerce',
      format: 'jpeg',
      public_id: uniqFileName,
    };
  },

  // allowedFormats: ['jpg', 'png'],
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // }
});

export const fileUpload = (name: string) => {
  return FileInterceptor(name, { storage: storage });
};

export const filesUpload = (name: string, maxCount: number) => {
  return FilesInterceptor(name, maxCount, { storage: storage });
};

export const fileFieldsUpload = (
  name: { name: string; maxCount: number }[],
) => {
  return FileFieldsInterceptor(name, { storage: storage });
};

export default storage;
