import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let adminService: AdminService;
  let jwtService: JwtService;

  // let bcrypt: any;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AdminService,
          useValue: {
            findByName: jest.fn().mockResolvedValue({}),
            storeRefreshToken: jest.fn().mockResolvedValue({}),
            getRefreshTokenHash: jest.fn().mockResolvedValue('hashedToken'),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('testToken'),
            verifyAsync: jest.fn().mockReturnValue({}),
            signAsync: jest.fn().mockResolvedValue('testToken'),
          },
        },
        // Not working. IDK why.
        // {
        //   provide: 'bcrypt',
        //   useValue: {
        //     compare: jest.fn().mockImplementation((a, b) => Promise.resolve(true)),
        //   },
        // }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    adminService = module.get<AdminService>(AdminService);
    jwtService = module.get<JwtService>(JwtService);
    // bcrypt = module.get('bcrypt');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return a JWT when credentials are valid', async () => {
      const result = {
        'access_token': 'testToken',
        'refresh_token': 'testToken',
      }
      // Also not working...
      // jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(bcrypt, 'compare').mockImplementation((a, b) => Promise.resolve(true));
      expect(await service.signIn('username', 'pass')).toEqual(result);
    });
  });

  describe('refreshToken', () => {
    it('should return a new access token', async () => {
      const result = {
        'access_token': 'testToken',
        'refresh_token': 'testToken',
      }
      jest.spyOn(bcrypt, 'compare').mockImplementation((a, b) => Promise.resolve(true));
      expect(await service.refreshAccessToken('refresh_token')).toEqual(result);
    });
  });
});