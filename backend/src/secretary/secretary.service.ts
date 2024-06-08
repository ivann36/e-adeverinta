import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Secretary } from './secretary.entity';
import * as bcrypt from 'bcrypt';
import { SecretaryDto } from './secretary.dto';

@Injectable()
export class SecretaryService {
  constructor(
    @InjectRepository(Secretary)
    private secretaryRepository: Repository<Secretary>,
  ) { }

  async findByEmail(email: string): Promise<SecretaryDto> {
    try {
      const secretary: Secretary = await this.secretaryRepository.findOne({ where: { email: email } });
      return {
        id: secretary.id,
        email: secretary.email,
        name: secretary.name,
        surname: secretary.surname,
        title: secretary.title,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Cannot find secretary');
    }
  }

  async getList(): Promise<SecretaryDto[]> {
    try {
      const secretary = await this.secretaryRepository.find();
      const secretaryListDto: SecretaryDto[] = secretary.map((secretary) => {
        return {
          id: secretary.id,
          email: secretary.email,
          name: secretary.name,
          surname: secretary.surname,
          title: secretary.title,
        };
      });
      return secretaryListDto;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Cannot get list of secretary');
    }
  }

  async editSecretary(id: number, newSecretary: SecretaryDto): Promise<SecretaryDto> {
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
      return await this.secretaryRepository.save(secretary);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid data of secretary');
    }
  }

  async deleteSecretary(id: number): Promise<DeleteResult> {
    try {
      return await this.secretaryRepository.delete({ id: id });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error while deleting secretary');
    }
  }

  async addSecretary(newSecretary: SecretaryDto): Promise<SecretaryDto> {
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
        return await this.secretaryRepository.save(secretary);
        console.log('Secretary added');
      } else {
        console.log('Invalid data of new secretary');
        throw new BadRequestException('Invalid data of new secretary');
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error while saving secretary info',
      );
    }
  }

  async getSecretary(id: number): Promise<SecretaryDto> {
    try {
      const secretary = await this.secretaryRepository.findOneBy({ id: id });
      return {
        id: secretary.id,
        email: secretary.email,
        name: secretary.name,
        surname: secretary.surname,
        title: secretary.title,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Cannot get secretary');
    }
  }

  async storeRefreshToken(email: string, refreshToken: string): Promise<Secretary> {
    try {
      const hash = await bcrypt.hash(refreshToken, 4);
      const secretary = await this.secretaryRepository.findOneBy({
        email: email,
      });
      secretary.refreshToken = hash;
      return await this.secretaryRepository.save(secretary);
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
