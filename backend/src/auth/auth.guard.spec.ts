import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard', () => {
  it('should be defined', () => {
    const jwtService = new JwtService();
    const configService = new ConfigService();
    expect(new AuthGuard(jwtService, configService)).toBeDefined();
  });
});
