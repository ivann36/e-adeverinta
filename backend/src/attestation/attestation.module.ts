import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attestation } from './attestation.entity';
import { AttestationService } from './attestation.service';
import { AttestationController } from './attestation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attestation])],
  providers: [AttestationService], // Add AdeverintaService to providers
  controllers: [AttestationController], // Add controllers if any
  exports: [AttestationService], // Export AdeverintaService
})
export class AttestationModule {}
