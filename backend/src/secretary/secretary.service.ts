import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Secretary } from './secretary.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecretaryService {
  constructor(
    @InjectRepository(Secretary)
    private secretaryRepository: Repository<Secretary>,
  ) {}

  async findByEmail(email: string): Promise<Secretary> {
    return this.secretaryRepository.findOne({ where: { email: email } });
  }

  async storeRefreshToken(email: string, refreshToken: string) {
    try {
      const hash = await bcrypt.hash(refreshToken, 4);
      const secretary = await this.secretaryRepository.findOneBy({
        email: email,
      });
      secretary.refreshToken = hash;
      this.secretaryRepository.save(secretary);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error while storing refresh token',
      );
    }
  }

  async getRefreshTokenHash(email: string): Promise<string> {
    const secretary = await this.secretaryRepository.findOneBy({
      email: email,
    });
    return secretary.refreshToken;
  }
}
