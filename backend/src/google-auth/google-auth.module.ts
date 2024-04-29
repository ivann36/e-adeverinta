import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleStrategy } from './google.strategy';
import { SecretaryModule } from 'src/secretary/secretary.module';
// import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [SecretaryModule],
  providers: [GoogleAuthService, GoogleStrategy],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}
