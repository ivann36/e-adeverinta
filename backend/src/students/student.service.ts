import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private StudentRepository: Repository<Student>,
  ) {}
  async getStudentByEmail(email: string): Promise<Student | null> {
    return await this.StudentRepository.findOneBy({ email: email });
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.StudentRepository.find();
  }
}
