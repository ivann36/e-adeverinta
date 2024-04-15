import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attestation } from './attestation.entity';
import { AttestationService } from './attestation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attestation])],
  providers: [AttestationService],
  exports: [AttestationService],
})
export class AttestationModule {}
