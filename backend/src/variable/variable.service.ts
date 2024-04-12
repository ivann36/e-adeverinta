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
    const variable = await this.variableRepository.findOneBy({
      name: constants.startIndexName,
    });
    variable.value = constants.defaultSheetStartIndex;
    await this.variableRepository.save(variable);
  }
}
