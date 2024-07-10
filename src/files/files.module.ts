import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { File } from '../common/entities';
import { MulterModule } from '@nestjs/platform-express';
import multerConfig from '../config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register(multerConfig()),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
