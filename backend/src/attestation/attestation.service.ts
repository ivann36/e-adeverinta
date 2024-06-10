import { Injectable } from '@nestjs/common';
import { Attestation } from './attestation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AttestationDto } from './attestation.dto';
import { StudentService } from 'src/students/student.service';
import { Student } from 'src/students/student.entity';
import { constants } from 'src/constants';

@Injectable()
export class AttestationService {
  constructor(
    @InjectRepository(Attestation)
    private attestationRepository: Repository<Attestation>,
    private readonly studentService: StudentService,

  ) { }

  async addNewEntries(attestations: Array<AttestationDto>) {
    attestations.forEach(async (attestation) => {
      const student: Student = await this.studentService.getStudentById(attestation.soliciter);
      const newAttestation = new Attestation();
      newAttestation.purpose = attestation.purpose;
      newAttestation.registrationNumber = attestation.registrationNumber;
      newAttestation.date = attestation.date;
      newAttestation.soliciter = student;

      this.attestationRepository.save(newAttestation);
    });
  }

  async addNewEntry(attestation: AttestationDto) {
    const student: Student = await this.studentService.getStudentById(attestation.soliciter);
    const newAttestation = new Attestation();
    newAttestation.purpose = attestation.purpose;
    newAttestation.registrationNumber = attestation.registrationNumber;
    newAttestation.date = attestation.date;
    newAttestation.soliciter = student;
    this.attestationRepository.save(newAttestation);
  }

  listAll() {
    return this.attestationRepository.find();
  }

  listApproved() {
    return this.attestationRepository.findBy({ status: constants.approved });
  }

  listUnapproved() {
    return this.attestationRepository.findBy({ status: constants.unapproved });
  }

  listRejected() {
    return this.attestationRepository.findBy({ status: constants.rejected });
  }

  async approve(id: number) {
    const attestation = await this.attestationRepository.findOneBy({ id: id });
    attestation.isApproved = true;
    this.attestationRepository.update(id, { status: constants.approved });
  }

  async unapprove(id: number) {
    const attestation = await this.attestationRepository.findOneBy({ id: id });
    attestation.isApproved = false;
    this.attestationRepository.update(id, { status: constants.unapproved });
  }

  async reject(id: number) {
    const attestation = await this.attestationRepository.findOneBy({ id: id });
    attestation.isApproved = false;
    this.attestationRepository.update(id, { status: constants.rejected });
  }

  findOne(id: number) {
    return this.attestationRepository.findOneBy({ id: id });
  }
}
