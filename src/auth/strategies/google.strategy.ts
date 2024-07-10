import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('google.GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>(
        'google.GOOGLE_CLIENT_SECRET',
      ),
      callbackURL: configService.getOrThrow<string>(
        'google.GOOGLE_CLIENT_CALLBACK_URL',
      ),
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, id } = profile;
    const user = await this.authService.validateUser({
      email: emails[0].value,
      googleId: id,
    });

    done(null, user);
  }
}
