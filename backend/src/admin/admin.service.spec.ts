import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { get } from 'http';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService, {
        provide: getRepositoryToken(Admin),
        useClass: Repository<Admin>,
      }],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
