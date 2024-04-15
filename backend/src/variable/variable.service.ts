import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Variable } from './variable.entity';
import { Repository } from 'typeorm';
import { constants } from 'src/constants';

@Injectable()
export class VariableService {
  constructor(
    @InjectRepository(Variable)
    private variableRepository: Repository<Variable>,
  ) {}

  async resetLastEntry(): Promise<void> {
    await this.setLastEntryNumber(constants.defaultSheetStartIndex);
  }

  async getLastEntryNumber(): Promise<number> {
    const variable = await this.variableRepository.findOneBy({
      name: constants.startIndexName,
    });
    return variable.value;
  }

  async setLastEntryNumber(num: number): Promise<void> {
    const variable = await this.variableRepository.findOneBy({
      name: constants.startIndexName,
    });
    variable.value = num;
    await this.variableRepository.save(variable);
  }
}
