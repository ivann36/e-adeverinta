import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { StudentService } from '../students/student.service';
import { AdminService } from './admin.service';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: StudentService,
          useValue: {},
        },
        {
          provide: AdminService,
          useValue: {},
        }
      ]

    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
