import { Test, TestingModule } from '@nestjs/testing';
import { AttestationService } from './attestation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Attestation } from './attestation.entity';
import { Repository } from 'typeorm';
import { Student } from '../students/student.entity';

describe('AttestationService', () => {
  let service: AttestationService;
  let repo: Repository<Attestation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttestationService,
        {
          provide: getRepositoryToken(Attestation),
          useClass: Repository,
        },
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
    attestations[0].id = 1;
    attestations[0].purpose = 'purpose1';
    attestations[0].date = new Date();
    attestations[0].soliciters = new Student();

    attestations[1].id = 2;
    attestations[1].purpose = 'purpose2';
    attestations[1].date = new Date();
    attestations[1].soliciters = new Student();
    jest.spyOn(repo, 'save')
      .mockResolvedValueOnce(attestations[0] as Attestation)
      .mockResolvedValueOnce(attestations[1] as Attestation);
    service.addNewEntries(attestations);
    expect(repo.save).toHaveBeenCalledWith(attestations[0]);
    expect(repo.save).toHaveBeenCalledWith(attestations[1]);
  });
});