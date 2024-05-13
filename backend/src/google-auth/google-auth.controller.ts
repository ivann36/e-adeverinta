import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google-auth')
export class GoogleAuthController {
  constructor(private readonly gauthService: GoogleAuthService) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const tokens = await this.gauthService.googleLogin(req.user);
    res.redirect(
      `http://localhost:3001/login/secretary?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`,
    );
  }

  @Post('refresh')
  async refreshAccessToken(@Body('refresh_token') refreshToken: string) {
    const tokens = await this.gauthService.refreshAccessToken(refreshToken);
    return tokens;
  }
}
