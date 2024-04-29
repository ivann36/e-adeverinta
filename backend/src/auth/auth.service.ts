import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { PayloadDto } from './dtos.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: AdminService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findByName(username);
    const isValidPass = await bcrypt.compare(pass, user.password);
    if (!isValidPass) {
      throw new UnauthorizedException();
    }
    const payload: PayloadDto = { sub: user.id, username: user.name };
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    await this.usersService.storeRefreshToken(user.name, refresh_token);
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: refresh_token,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const payload: any = await this.jwtService.verifyAsync(refreshToken);
      const refreshTokenHash = await this.usersService.getRefreshTokenHash(
        payload.username,
      );
      const isValidRefreshToken = await bcrypt.compare(
        refreshTokenHash,
        refreshToken,
      );
      if (!isValidRefreshToken) {
        throw new UnauthorizedException();
      }
      return {
        access_token: await this.jwtService.signAsync({
          sub: payload.sub,
          username: payload.username,
        }),
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
