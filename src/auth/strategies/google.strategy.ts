import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('google.GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>(
        'google.GOOGLE_CLIENT_SECRET',
      ),
      callbackURL: configService.getOrThrow<string>(
        'google.GOOGLE_CLIENT_CALLBACK_URL',
      ),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, id } = profile;
    const user = {
      email: emails[0].value,
      googleId: id,
    };
    done(null, user);
  }
}
