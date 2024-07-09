import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from '../common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Folder])],
  providers: [FoldersService],
  controllers: [FoldersController],
})
export class FoldersModule {}
