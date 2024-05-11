import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Secretary } from './secretary.entity';
import * as bcrypt from 'bcrypt';
import { SecretaryDto } from './secretary.dto';

@Injectable()
export class SecretaryService {
  constructor(
    @InjectRepository(Secretary)
    private secretaryRepository: Repository<Secretary>,
  ) {}

  async findByEmail(email: string): Promise<Secretary> {
    try {
      return this.secretaryRepository.findOne({ where: { email: email } });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Cannot find secretary');
    }
  }

  async getList(): Promise<Secretary[]> {
    try {
      const secretary = this.secretaryRepository.find();
      return secretary;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Cannot get list of secretary');
    }
  }

  async editSecretary(id: number, newSecretary: SecretaryDto) {
    try {
      const secretary = await this.secretaryRepository.findOneBy({ id: id });
      secretary.email = newSecretary.email
        ? newSecretary.email
        : secretary.email;
      secretary.name = newSecretary.name ? newSecretary.name : secretary.name;
      secretary.surname = newSecretary.surname
        ? newSecretary.surname
        : secretary.surname;
      secretary.title = newSecretary.title
        ? newSecretary.title
        : secretary.title;
      this.secretaryRepository.save(secretary);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid data of secretary');
    }
  }

  async addSecretary(newSecretary: SecretaryDto) {
    try {
      const secretary = new Secretary();
      if (
        newSecretary.email &&
        newSecretary.name &&
        newSecretary.surname &&
        newSecretary.title
      ) {
        secretary.email = newSecretary.email;
        secretary.name = newSecretary.name;
        secretary.surname = newSecretary.surname;
        secretary.title = newSecretary.title;
        this.secretaryRepository.save(secretary);
      } else {
        throw new BadRequestException('Invalid data of new secretary');
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error while saving secretary info',
      );
    }
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
    try {
      const secretary = await this.secretaryRepository.findOneBy({
        email: email,
      });
      return secretary.refreshToken;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error while obtaining refresh token',
      );
    }
  }
}
