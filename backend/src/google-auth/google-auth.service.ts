import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SecretaryService } from 'src/secretary/secretary.service';

@Injectable()
export class GoogleAuthService {
  constructor(
    private jwtService: JwtService,
    private secretaryService: SecretaryService,
  ) {}

  async googleLogin(user) {
    try {
      if (!user) {
        throw new UnauthorizedException();
      }
      const secretary = await this.secretaryService.findByEmail(user.email);
      if (!secretary) {
        throw new UnauthorizedException();
      }
      const payload = {
        sub: secretary.id,
        email: secretary.email,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
        }),
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error while authenticating');
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const payload: any = await this.jwtService.verifyAsync(refreshToken);
      return {
        access_token: await this.jwtService.signAsync({
          sub: payload.sub,
          email: payload.email,
        }),
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
