import { Controller, UploadedFile, UseInterceptors, Post, BadRequestException, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { parse } from 'node-xlsx';
import { StudentService } from '../students/student.service';
import { StudentDto } from '../students/student.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('admin')
export class AdminController {
    constructor(
        private adminService: AdminService,
        private studentService: StudentService,
    ) { }

    @Post('upload')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFileXlsx(@UploadedFile() file: Express.Multer.File) {
        // ToDo: Implement for csv files
        console.log(file);
        const workSheets = parse(file.buffer);
        const data = workSheets[0].data as Array<Array<string>>;
        const keys = data.shift();

        const keyMapping = {
            "Email": "email",
            "Program de studii": "studyField",
            "Ciclu de studii": "studyCycle",
            "An studiu": "studyYear",
            "Domeniu studii": "studyField",
            "Forma învățământ": "studyForm",
            "Finanțare": "financiation",
            "Nume Tată Prenume": ["firstName", "fatherInitial", "lastName"],
            "Sex": "gender"
        };

        const result = [];
        for (const row of data) {
            let studentData = {};
            let isValid = true;

            for (let i = 0; i < row.length; i++) {
                let value = row[i]; // Trim whitespace
                if(typeof value === 'string'){
                    value = value.trim();
                }
                const mappedKey = keyMapping[keys[i]];

                if (Array.isArray(mappedKey)) {
                    const parts = value.split(' ');
                    if (parts.length === 3) {
                        studentData[mappedKey[0]] = this.removeDiacritics(parts[0]);
                        studentData[mappedKey[1]] = this.removeDiacritics(parts[1]);
                        studentData[mappedKey[2]] = this.removeDiacritics(parts[2]);
                    } else {
                        isValid = false;
                    }
                } else if (isValid) {
                    studentData[mappedKey] = value;
                }
                // Validate and sanitize based on the key
                


            }
            if(!this.validateEmail(studentData["email"], studentData["firstName"], studentData["lastName"])){
                isValid = false;
            }
            if(!this.validateNameLength(studentData["firstName"])){
                isValid = false;
            }
            if(!this.validateNameLength(studentData["lastName"])){
                isValid = false;
            }
            if(studentData["fatherInitial"].length > 1){
                isValid = false;
            }


            if (isValid) {
                result.push(studentData);
            }
            else {
                console.log('Invalid data', studentData);
                throw new BadRequestException('Invalid data');
            }
        }

        for (const studentData of result) {
            const studentDto = new StudentDto();
            Object.assign(studentDto, studentData);
            console.log(studentDto)
            await this.studentService.createStudent(studentDto);
        }

        return result;
    }

    validateEmail(email: string, firstName: string, lastName: string): boolean {
        console.log(email, firstName, lastName);
        // Implement email validation logic here
        // This is a simplified example. Consider using a library like validator.js for more robust validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const [localPart, domain] = email.split('@');
        const nameParts = localPart.split('.');
        const validDomain = domain === 'student.usv.ro';
        let result = emailRegex.test(email) && validDomain

        // check if firstame and lastname are in email
        if (!email.includes(firstName.toLocaleLowerCase()) || !email.includes(lastName.toLocaleLowerCase())) {
            result = false;
        }
        if(result === false){
            console.log('Invalid email', email);
        }
        return result;
    }

    removeDiacritics(text: string): string {
        // Implement diacritics removal logic here
        // This is a simplified example. Consider using a library like he for more comprehensive handling
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    validateNameLength(name: string): boolean {
        // Implement name length validation logic here
        return name.length >= 2 && name.length <= 50;
    }
}
