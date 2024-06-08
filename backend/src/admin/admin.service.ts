import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  findByName(name: string) {
    return this.adminRepository.findOneBy({ name: name });
  }

  async storeRefreshToken(name: string, refreshToken: string) {
    try {
      const hash = await bcrypt.hash(refreshToken, 4);
      const admin = await this.adminRepository.findOneBy({ name: name });
      admin.refreshToken = hash;
      this.adminRepository.save(admin);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error while storing refresh token',
      );
    }
  }

  async getRefreshTokenHash(username: string): Promise<string> {
    const admin = await this.adminRepository.findOneBy({ name: username });
    return admin.refreshToken;
  }

  create(data: { name: string; password: string }) {
    return this.adminRepository.save(data);
  }
}
