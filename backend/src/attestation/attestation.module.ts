import { Module } from '@nestjs/common';
import { Attestation } from './attestation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Attestation])] })
export class AttestationModule {}
