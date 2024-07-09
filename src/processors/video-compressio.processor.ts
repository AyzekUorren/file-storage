import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { BullQueues } from 'src/common/constants/bull-queues';
import { Storage } from '@google-cloud/storage';
import { join } from 'node:path';
import { v4 as uuid } from 'uuid';
import fs from 'node:fs';
import * as ffmpeg from 'fluent-ffmpeg';
import { ConfigService } from '@nestjs/config';

@Processor(BullQueues.VideoCompression)
export class VideoCompressionProcessor {
  private readonly logger = new Logger(VideoCompressionProcessor.name);
  private storage: Storage;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.storage = new Storage({
      keyFilename: 'path/to/your/google-cloud-key.json',
    });
    this.bucketName = configService.get('google.GOOGLE_BUCKET_NAME');
  }

  @Process()
  async handleVideoCompression(job: Job<any>) {
    const { videoPath } = job.data;
    const outputFileName = `${uuid()}.mp4`;
    const outputFilePath = join(__dirname, '..', 'tmp', outputFileName);

    try {
      await this.compressVideo(videoPath, outputFilePath);
      await this.uploadToGoogleCloud(outputFilePath, outputFileName);
      this.logger.log(`File compressed and saved: ${outputFileName}`);
    } catch (error) {
      this.logger.error('Error in video compression:', error);
    } finally {
      this.deleteLocalFile(outputFilePath);
    }
  }

  private compressVideo(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions('-c:v libx264')
        .outputOptions('-crf 28')
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .save(outputPath);
    });
  }

  private async uploadToGoogleCloud(filePath: string, fileName: string) {
    await this.storage.bucket(this.bucketName).upload(filePath, {
      destination: `compressed-videos/${fileName}`,
    });
  }

  private deleteLocalFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        this.logger.error('Error while deleting Temporary file:', err);
      } else {
        this.logger.log('Temporary File deleted successfully:', filePath);
      }
    });
  }
}
