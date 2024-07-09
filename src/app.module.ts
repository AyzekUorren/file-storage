import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { BullModule } from '@nestjs/bull';
import { ThrottlerModule } from '@nestjs/throttler';
import bullConfig from './config/bull.config';
import videoCompressionQueueConfig from './config/video-compression-queue.config';
import { VideoCompressionProcessor } from './processors/video-compressio.processor';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { FoldersModule } from './folders/folders.module';
import { PermissionsModule } from './permissions/permissions.module';
import throttlersConfig from './config/throttlers.config';
import googleConfig from './config/google.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        googleConfig,
        bullConfig,
        databaseConfig,
        videoCompressionQueueConfig,
        throttlersConfig,
      ],
    }),
    ThrottlerModule.forRoot(throttlersConfig()),
    TypeOrmModule.forRoot(databaseConfig()),
    BullModule.forRoot(bullConfig()),
    BullModule.registerQueue(videoCompressionQueueConfig()),
    AuthModule,
    FilesModule,
    FoldersModule,
    PermissionsModule,
  ],
  providers: [VideoCompressionProcessor],
})
export class AppModule {}
