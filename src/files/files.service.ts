import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../common/entities';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { unlink } from 'node:fs';
import { join, extname } from 'node:path';
import { CreateFileDto, UploadFileDto } from './dto';

@Injectable()
export class FilesService {
  private readonly logger: Logger = new Logger(FilesService.name);
  private readonly temporaryFolder: string;
  private readonly storage: Storage;
  private readonly bucketName: string;
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private configService: ConfigService,
  ) {
    this.storage = new Storage({
      keyFilename: 'google-cloud-key.json',
    });
    this.bucketName = configService.get('google.GOOGLE_BUCKET_NAME');
    this.temporaryFolder = join(
      __dirname,
      '../../',
      configService.get('multer.dest'),
    );
  }

  async uploadFile({
    file,
    folderId,
  }: {
    file: Express.Multer.File;
    folderId: number;
  }) {
    try {
      const fileType = extname(file.originalname);

      const fileUrl = await this.uploadFileToBucket({
        name: file.filename,
        fileType,
        contentType: file.mimetype,
      });

      return await this.create({ name: file.filename, url: fileUrl, folderId });
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.deleteLocalFile(join(this.temporaryFolder, file.filename));
    }
  }

  private async uploadFileToBucket(data: UploadFileDto) {
    const bucket = this.storage.bucket(this.bucketName);
    const uploadPath = join(this.temporaryFolder, data.name);

    await bucket.upload(uploadPath, {
      destination: `${data.name}${data.fileType}`,
      contentType: data.contentType,
      metadata: {
        contentType: data.contentType,
      },
    });

    return `https://storage.googleapis.com/${this.bucketName}/${data.name}${data.fileType}`;
  }

  private create(createFileDto: CreateFileDto) {
    const file = this.filesRepository.create(createFileDto);
    return this.filesRepository.save(file);
  }

  findAll() {
    return this.filesRepository.find();
  }

  private deleteLocalFile(filePath: string) {
    unlink(filePath, (err) => {
      if (err) {
        this.logger.error('Error while deleting Temporary file:', err);
      } else {
        this.logger.log('Temporary File deleted successfully:', filePath);
      }
    });
  }
}
