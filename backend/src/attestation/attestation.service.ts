import { Injectable } from '@nestjs/common';
import { Attestation } from './attestation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttestationService {
  constructor(
    @InjectRepository(Attestation)
    private attestationRepository: Repository<Attestation>,
  ) {}

  addNewEntries(attestations: Array<Attestation>) {
    attestations.forEach((attestation) => {
      this.attestationRepository.save(attestation);
    });
  }
}
