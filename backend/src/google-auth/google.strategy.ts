import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthService } from './google-auth.service';

Injectable();
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private authService: GoogleAuthService,
  ) {
    super({
      clientID: configService.get('CLIENT_ID'),
      clientSecret: configService.get('CLIENT_SECRET'),
      callbackURL: configService.get('CALL_BACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user = await this.authService.validateUser(
      profile.emails[0].value,
    );
    return done(null, user);
  }
}
