import { registerAs } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export default registerAs(
  'throttlers',
  (): ThrottlerModuleOptions => ({
    throttlers: [
      {
        ttl: 60000,
        limit: 10,
      },
    ],
  }),
);
