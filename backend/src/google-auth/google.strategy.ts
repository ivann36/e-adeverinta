import { Inject, Injectable } from '@nestjs/common';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

Injectable();
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject(ConfigService) private configService: ConfigService) {
    super({
      // clientID: googleAuthConstants.clientId,
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
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);
    // console.log(done);

    // const user = await this.authService.validateUser(
    //   profile.emails[0].value,
    //   profile.displayName,
    // );
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
    };

    return done(null, user);
  }
}
