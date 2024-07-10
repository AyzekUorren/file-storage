import { registerAs } from '@nestjs/config';
import { MulterModuleOptions } from '@nestjs/platform-express';

export default registerAs(
  'multer',
  (): MulterModuleOptions => ({
    dest: './uploads',
  }),
);
