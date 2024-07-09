import { BullModuleOptions } from '@nestjs/bull';
import { registerAs } from '@nestjs/config';
import { BullQueues } from 'src/common/constants/bull-queues';

export default registerAs(
  'video_compression_queue',
  (): BullModuleOptions => ({
    name: BullQueues.VideoCompression,
  }),
);
