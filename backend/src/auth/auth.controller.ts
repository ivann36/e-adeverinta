import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

class SignInDto {
  username: string;
  password: string;
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    console.log(signInDto.username, signInDto.password);
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }
}
