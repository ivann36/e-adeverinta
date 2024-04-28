import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { PayloadDto } from './dtos.dto';

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
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload: PayloadDto = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const payload: any = await this.jwtService.verifyAsync(refreshToken);
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
