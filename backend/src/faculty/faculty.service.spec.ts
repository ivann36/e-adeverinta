import { Test, TestingModule } from '@nestjs/testing';
import { FacultyService } from './faculty.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculty } from './faculty.entity';

describe('FacultyService', () => {
  let service: FacultyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<FacultyService>(FacultyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
