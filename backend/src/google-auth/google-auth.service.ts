import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SecretaryService } from 'src/secretary/secretary.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GoogleAuthService {
  constructor(
    private jwtService: JwtService,
    private secretaryService: SecretaryService,

  ) { }

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
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });
      this.secretaryService.storeRefreshToken(secretary.email, refreshToken);
      return {
        access_token: await this.jwtService.signAsync(payload),
        refresh_token: refreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error while authenticating');
    }
  }

  async validateUser(email: string) {
    const user = await this.secretaryService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const payload: any = await this.jwtService.verifyAsync(refreshToken);
      const refreshTokenHash = await this.secretaryService.getRefreshTokenHash(
        payload.username,
      );
      const isValidRefreshToken = await bcrypt.compare(
        refreshTokenHash,
        refreshToken,
      );
      if (!isValidRefreshToken) {
        throw new UnauthorizedException();
      }
      const newRefreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });

      await this.secretaryService.storeRefreshToken(payload.username, newRefreshToken);

      return {
        access_token: await this.jwtService.signAsync({
          sub: payload.sub,
          email: payload.email,
        }),
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error while refreshing token');
    }
  }
}
