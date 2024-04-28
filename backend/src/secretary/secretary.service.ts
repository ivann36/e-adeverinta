import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Secretary } from './secretary.entity';

@Injectable()
export class SecretaryService {
  constructor(
    @InjectRepository(Secretary)
    private secretaryRepository: Repository<Secretary>,
  ) {}

  async findByEmail(email: string): Promise<Secretary> {
    return this.secretaryRepository.findOne({ where: { email: email } });
  }
}
