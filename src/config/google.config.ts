import { registerAs } from '@nestjs/config';

export default registerAs('google', () => ({
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_BUCKET_NAME: process.env.GOOGLE_BUCKET_NAME,
  GOOGLE_CLIENT_CALLBACK_URL:
    process.env.GOOGLE_CLIENT_CALLBACK_URL ||
    'http://localhost:3000/auth/google/callback',
}));
