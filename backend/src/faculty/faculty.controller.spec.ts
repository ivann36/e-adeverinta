import { Test, TestingModule } from '@nestjs/testing';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';
import { Faculty } from './faculty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('FacultyController', () => {
  let controller: FacultyController;
  let service: FacultyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacultyController],
      providers: [FacultyService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'db/sql.sqlite',
          synchronize: true,
          entities: [Faculty]
        }),
        TypeOrmModule.forFeature([Faculty])
      ],
    }).compile();

    controller = module.get<FacultyController>(FacultyController);
    service = module.get<FacultyService>(FacultyService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
