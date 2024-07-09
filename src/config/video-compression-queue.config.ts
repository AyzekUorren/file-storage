import { BullModuleOptions } from '@nestjs/bull';
import { registerAs } from '@nestjs/config';
import { BullQueues } from 'src/common/enums/bull-queues';

export default registerAs(
  BullQueues.VideoCompression,
  (): BullModuleOptions => ({
    name: BullQueues.VideoCompression,
  }),
);
