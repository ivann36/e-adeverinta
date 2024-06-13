import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AdminService } from './admin/admin.service';
import * as bycrpt from 'bcrypt';
import { SecretaryService } from './secretary/secretary.service';
import { SecretaryDto } from './secretary/secretary.dto';
import { StudentService } from './students/student.service';
import { StudentDto } from './students/student.dto';
import { ConfigService } from '@nestjs/config';
import { FacultyService } from './faculty/faculty.service';
import { AttestationService } from './attestation/attestation.service';
import { AttestationDto } from './attestation/attestation.dto';
import { VariableService } from './variable/variable.service';
import { constants } from './constants';

async function bootstrap() {
    const application = await NestFactory.createApplicationContext(
        AppModule,
    );
    const confService = application.get(ConfigService);
    const adminService = application.get(AdminService);
    await adminService.create({
        id: 1,
        name: 'admin',
        password: bycrpt.hashSync('admin', 4),
    });

    const secretaryService = application.get(SecretaryService);

    const newSecretary = new SecretaryDto();
    newSecretary.email = confService.get('SECRETARY_EMAIL');
    newSecretary.name = 'Secretary';
    newSecretary.surname = 'Surname';
    newSecretary.title = 'Developer';
    await secretaryService.addSecretary(newSecretary);

    const studentService = application.get(StudentService);
    for (let i = 0; i < 10; i++) {
        const newStudent = new StudentDto();
        newStudent.email = `student.stud${i}@email.com`;
        newStudent.firstName = `Student${i}`;
        newStudent.lastName = `Surname${i}`;
        newStudent.fatherInitial = 'F';
        newStudent.studyCycle = 'Bachelor';
        newStudent.studyField = 'Informatics';
        newStudent.studyForm = 'Full time';
        newStudent.studyYear = 1;
        newStudent.financiation = 'Budget';
        newStudent.gender = 'M';
        await studentService.createStudent(newStudent);
    }
    const newStudent = new StudentDto();
    newStudent.email = confService.get('SECRETARY_EMAIL');
    newStudent.firstName = `Student`;
    newStudent.lastName = `Surname`;
    newStudent.fatherInitial = 'F';
    newStudent.studyCycle = 'Bachelor';
    newStudent.studyField = 'Informatics';
    newStudent.studyForm = 'Full time';
    newStudent.studyYear = 1;
    newStudent.financiation = 'Budget';
    newStudent.gender = 'M';
    await studentService.createStudent(newStudent);

    const facultyService = application.get(FacultyService);
    await facultyService.createFaculty({
        id: 1,
        fullName: 'Faculty of Informatics',
        deanName: 'Dean',
        shortName: 'FI',
        chiefSecretaryName: 'Secretary',
        currentAcademicYear: '2021',
    });

    const attestationService = application.get(AttestationService);
    let attestations: AttestationDto[] = [];
    for (let i = 0; i < 10; i++) {
        const attestation = {
            date: new Date(),
            purpose: `Purpose${i}`,
            soliciter: i % 6 + 1,
        };
        await attestationService.addNewEntry(attestation);
    }

    const variableService = application.get(VariableService);
    await variableService.createVariable({
        name: constants.startIndexName,
        value: constants.defaultSheetStartIndex,
    });
}

bootstrap();
