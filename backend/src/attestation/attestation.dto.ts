import { StudentDto } from "src/students/student.dto";

export class AttestationDto {
    purpose: string;
    registrationNumber?: string;
    date: Date;
    soliciter: number;
    isApproved: boolean;
}