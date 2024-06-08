import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('AdminService', () => {
  let service: AdminService;
  let repo: Repository<Admin>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(Admin),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    repo = module.get<Repository<Admin>>(getRepositoryToken(Admin));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an admin', async () => {
    const admin: Admin = {
      id: 1,
      name: 'Test',
      password: bcrypt.hashSync('password', 4)
    };
    jest.spyOn(repo, 'save').mockResolvedValue(admin as any);
    expect(await service.create(admin)).toEqual(admin);
  });

  it('should find an admin by name', async () => {
    const admin: Admin = {
      id: 1,
      name: 'Test',
      password: bcrypt.hashSync('password', 4)
    };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(admin as any);
    expect(await service.findByName('Test')).toEqual(admin);
  });

  it('should store a refresh token', async () => {
    const admin: Admin = {
      id: 1,
      name: 'Test',
      password: bcrypt.hashSync('password', 4)
    };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(admin as any);
    jest.spyOn(repo, 'save').mockResolvedValue(admin as any);
    expect(await service.storeRefreshToken('Test', 'token')).toBeUndefined();
  });

  it('should get a refresh token hash', async () => {
    const admin: Admin = {
      id: 1,
      name: 'Test',
      password: bcrypt.hashSync('password', 4),
      refreshToken: bcrypt.hashSync('token', 4)
    };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(admin as any);
    expect(await service.getRefreshTokenHash('Test')).toEqual(admin.refreshToken);
  });
});