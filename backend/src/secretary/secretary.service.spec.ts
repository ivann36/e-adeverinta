import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SecretaryService } from './secretary.service';
import { Secretary } from './secretary.entity';

describe('SecretaryService', () => {
  let service: SecretaryService;
  let repo: Repository<Secretary>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretaryService,
        {
          provide: getRepositoryToken(Secretary),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SecretaryService>(SecretaryService);
    repo = module.get<Repository<Secretary>>(getRepositoryToken(Secretary));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a secretary', async () => {
    const result: Secretary = new Secretary();
    result.id = 1;
    result.name = 'test';
    result.surname = 'test';
    result.email = 'email@test.com';
    result.title = 'test';
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(result);
    console.log(await service.getSecretary(1))
    expect(await service.getSecretary(1)).toEqual(result);
  });

  it('should find a secretary by email', async () => {
    const result = new Secretary();
    result.id = 1;
    result.name = 'test';
    result.surname = 'test';
    result.email = 'test@example.com';
    result.title = 'test';
    jest.spyOn(repo, 'findOne').mockResolvedValue(result);
    expect(await service.findByEmail('test@example.com')).toEqual(result);
  });

  it('should get a list of secretaries', async () => {
    const result = [new Secretary(), new Secretary()];
    result[0].id = 1;
    result[0].name = 'test';
    result[0].surname = 'test';
    result[0].email = 'test1@example.com';
    result[0].title = 'test';

    result[1].id = 2;
    result[1].name = 'test';
    result[1].surname = 'test';
    result[1].email = 'test2@example.com';
    result[1].title = 'test';

    jest.spyOn(repo, 'find').mockResolvedValue(result);
    expect(await service.getList()).toEqual(result);
  });

  it('should edit a secretary', async () => {
    const input = new Secretary();
    input.id = 1;
    input.name = 'test';
    input.surname = 'test';
    input.email = 'test@example.com';
    input.title = 'test';

    const result = new Secretary();
    result.id = 1;
    result.name = 'test1';
    result.surname = 'test1';
    result.email = 'test1@example.com';
    result.title = 'test1';
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(input);
    jest.spyOn(repo, 'save').mockResolvedValue(result);
    expect(await service.editSecretary(1, result)).toEqual(result);
  });

  it('should delete a secretary', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as DeleteResult);
    expect(await service.deleteSecretary(1)).toEqual({ affected: 1 });
  });

  it('should add a secretary', async () => {
    const result = new Secretary();
    result.name = 'test1';
    result.surname = 'test1';
    result.email = 'test1@example.com';
    result.title = 'test1';
    jest.spyOn(repo, 'save').mockResolvedValue(result);
    expect(await service.addSecretary(result)).toEqual(result);
  });

  it('should store a refresh token', async () => {
    const result = new Secretary();
      result.id = 1;
      result.name = 'test1';
      result.surname = 'test1';
      result.email = 'test1@example.com';
      result.title = 'test1';
      result.refreshToken = 'token';
    jest.spyOn(repo, 'save').mockResolvedValue(result);
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(result);

    expect(await service.storeRefreshToken('test1@example.com', 'token')).toEqual(result);
  });

  it('should get a refresh token hash', async () => {
    const result = 'token';
    const secretary = new Secretary();
    secretary.id = 1;
    secretary.name = 'test1';
    secretary.surname = 'test1';
    secretary.email = 'test@mail.com';
    secretary.refreshToken = result;
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(secretary);
    expect(await service.getRefreshTokenHash('test@example.com')).toEqual(result);
  });
});