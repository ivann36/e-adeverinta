import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { PayloadDto } from './dtos.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) { }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const user = await this.adminService.findByName(username);
      const isValidPass = await bcrypt.compare(pass, user.password);
      
      console.log('isValidPass');
      console.log(isValidPass);


      if (!isValidPass) {
        throw new UnauthorizedException();
      }
      const payload: PayloadDto = { sub: user.id, username: user.name };
      const refresh_token = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });
      await this.adminService.storeRefreshToken(user.name, refresh_token);
      return {
        access_token: await this.jwtService.signAsync(payload),
        refresh_token: refresh_token,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const payload: any = await this.jwtService.verifyAsync(refreshToken);
      const refreshTokenHash = await this.adminService.getRefreshTokenHash(
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

      await this.adminService.storeRefreshToken(payload.username, newRefreshToken);

      return {
        access_token: await this.jwtService.signAsync({
          sub: payload.sub,
          username: payload.username,
        }),
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
