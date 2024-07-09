import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BullQueues } from 'src/common/enums/bull-queues';

@Injectable()
export class VideoService {
  constructor(
    @InjectQueue(BullQueues.VideoCompression)
    private videoCompressionQueue: Queue,
  ) {}

  async uploadVideo(videoPath: string) {
    await this.videoCompressionQueue.add({
      videoPath,
    });
  }
}
