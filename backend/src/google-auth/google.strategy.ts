import { Injectable } from '@nestjs/common';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { googleAuthConstants } from './constants';

Injectable();
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: googleAuthConstants.clientId,
      clientSecret: googleAuthConstants.clientSecret,
      callbackURL: googleAuthConstants.callBackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    console.log(accessToken);
    console.log(profile);
    console.log(done);

    // const user = await this.authService.validateUser(
    //   profile.emails[0].value,
    //   profile.displayName,
    // );

    // return user || null;
    return null;
  }
}
