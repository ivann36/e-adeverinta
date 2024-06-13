import { Injectable } from '@nestjs/common';
import { Attestation } from './attestation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AttestationDto } from './attestation.dto';
import { StudentService } from '../students/student.service';
import { Student } from '../students/student.entity';
import { constants } from '../constants';

@Injectable()
export class AttestationService {
  constructor(
    @InjectRepository(Attestation)
    private attestationRepository: Repository<Attestation>,
    private readonly studentService: StudentService,

  ) { }

  async addNewEntries(attestations: Array<AttestationDto>) {
    attestations.forEach(async (attestation) => {
      await this.addNewEntry(attestation);

    });
  }

  async addNewEntry(attestation: AttestationDto) {
    try{
      const student: Student = await this.studentService.getStudentById(attestation.soliciter);
      const newAttestation = new Attestation();
      newAttestation.purpose = attestation.purpose;
      newAttestation.registrationNumber = attestation.registrationNumber;
      newAttestation.date = attestation.date;
      newAttestation.soliciter = student;
      newAttestation.status = constants.unapproved;
      console.log(await this.attestationRepository.save(newAttestation));
    }catch(err){
      console.log(err);
    }
  }

  async listAll() {
    const res = await this.attestationRepository.find()
    console.log(res);
    return await this.attestationRepository.find();
  }

  async listApproved() {
    return await this.attestationRepository.findBy({ status: constants.approved });
  }

  async listUnapproved() {
    return await this.attestationRepository.findBy({ status: constants.unapproved });
  }

  async listRejected() {
    return await this.attestationRepository.findBy({ status: constants.rejected });
  }

  async approve(id: number) {
    await this.attestationRepository.update(id, { status: constants.approved });
  }

  async unapprove(id: number) {
    await this.attestationRepository.update(id, { status: constants.unapproved });
  }

  async reject(id: number) {
    await this.attestationRepository.update(id, { status: constants.rejected });
  }

  async findOne(id: number) {
    return await this.attestationRepository.findOneBy({ id: id });
  }
}
