import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Attestation } from './attestation.entity';
import { Repository } from 'typeorm';
import { AttestationDto } from './attestation.dto';
import { AttestationService } from './attestation.service';
import { StudentService } from '../students/student.service';
import { Student } from '../students/student.entity';

describe('AttestationService', () => {
  let service: AttestationService;
  let repo: Repository<Attestation>;
  let studentService: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttestationService,
        {
          provide: getRepositoryToken(Attestation),
          useClass: Repository,
        },
        {
          provide: StudentService,
          useValue: {
            getStudentById: jest.fn(
              (id: number) => {
              let student = new Student();
              student.id = id;
              return Promise.resolve(student);
            }),
          }
        }
      ],
    }).compile();

    service = module.get<AttestationService>(AttestationService);
    repo = module.get<Repository<Attestation>>(getRepositoryToken(Attestation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add new entries', async () => {
    const attestations: Attestation[] = [new Attestation(), new Attestation()];
    const attestationsDto: AttestationDto[] = [new AttestationDto(), new AttestationDto()];

    attestations[0].purpose = 'purpose1';
    attestations[0].date = new Date();
    attestations[0].soliciter = new Student();
    attestations[0].soliciter.id = 1;
    attestations[0].registrationNumber = '123';

    attestations[1].purpose = 'purpose2';
    attestations[1].date = new Date();
    attestations[1].soliciter = new Student();
    attestations[1].soliciter.id = 2;
    attestations[1].registrationNumber = '456';

    attestationsDto[0].purpose = 'purpose1';
    attestationsDto[0].soliciter = 1;
    attestationsDto[0].date = attestations[0].date;
    attestationsDto[0].registrationNumber = '123';

    attestationsDto[1].purpose = 'purpose2';
    attestationsDto[1].soliciter = 2;
    attestationsDto[1].date = attestations[1].date;
    attestationsDto[1].registrationNumber = '456';
    jest.spyOn(repo, 'save')
      .mockResolvedValueOnce(attestations[0] as Attestation)
      .mockResolvedValueOnce(attestations[1] as Attestation);
    await service.addNewEntries(attestationsDto);
    expect(repo.save).toHaveBeenCalledWith(attestations[0]);
    expect(repo.save).toHaveBeenCalledWith(attestations[1]);
  });
});