import { Test, TestingModule } from '@nestjs/testing';
import { SecretaryController } from './secretary.controller';
import { SecretaryService } from './secretary.service';
import { SecretaryDto } from './secretary.dto';
import { DeleteResult } from 'typeorm';

describe('SecretaryController', () => {
  let controller: SecretaryController;
  let service: SecretaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretaryController],
      providers: [
        {
          provide: SecretaryService,
          useValue: {
            getList: jest.fn().mockResolvedValue([]),
            getSecretary: jest.fn().mockResolvedValue(new SecretaryDto()),
            addSecretary: jest.fn().mockResolvedValue(new SecretaryDto()),
            editSecretary: jest.fn().mockResolvedValue(new SecretaryDto()),
            deleteSecretary: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    controller = module.get<SecretaryController>(SecretaryController);
    service = module.get<SecretaryService>(SecretaryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all secretaries', async () => {
    const result = [];
    jest.spyOn(service, 'getList').mockResolvedValue(result);
    expect(await controller.getAll()).toBe(result);
  });

  it('should get one secretary', async () => {
    const result = new SecretaryDto();
    jest.spyOn(service, 'getSecretary').mockResolvedValue(result);
    expect(await controller.getOne(1)).toBe(result);
  });

  it('should create a secretary', async () => {
    const secretaryDto = new SecretaryDto();
    jest.spyOn(service, 'addSecretary').mockResolvedValue(secretaryDto);
    expect(await controller.create(secretaryDto)).toBe(undefined);
  });

  it('should update a secretary', async () => {
    const secretaryDto = new SecretaryDto();
    jest.spyOn(service, 'editSecretary').mockResolvedValue(secretaryDto);
    expect(await controller.update(1, secretaryDto)).toBe(undefined);
  });

  it('should delete a secretary', async () => {
    jest.spyOn(service, 'deleteSecretary').mockResolvedValue({ affected: 1 } as DeleteResult);
    expect(await controller.delete(1)).toBe(undefined);
  });
});