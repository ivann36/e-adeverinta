import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from './faculty.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FacultyService {
    constructor(
        @InjectRepository(Faculty)
        private facultyRepository: Repository<Faculty>,
    ) { }

    async editFaculty(newFacultyData: Partial<Faculty>, id: number = 1) {
        try {
            let faculty: Faculty = await this.facultyRepository.findOneBy({ id: id })
            if (!faculty) {
                throw new BadRequestException('Faculty not found');
            }

            if (newFacultyData.fullName) {
                faculty.fullName = newFacultyData.fullName;
            }
            if (newFacultyData.shortName) {
                faculty.shortName = newFacultyData.shortName;
            }
            if (newFacultyData.currentAcademicYear) {
                faculty.currentAcademicYear = newFacultyData.currentAcademicYear;
            }
            if (newFacultyData.deanName) {
                faculty.deanName = newFacultyData.deanName;
            }
            if (newFacultyData.chiefSecretaryName) {
                faculty.chiefSecretaryName = newFacultyData.chiefSecretaryName;
            }

            await this.facultyRepository.save(faculty);
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Invalid data of faculty');
        }
    }

    async getFaculty(id = 1) {
        return await this.facultyRepository.findOneBy({ id: id });
    }
}