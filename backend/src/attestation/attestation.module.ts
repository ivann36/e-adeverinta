import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attestation } from './attestation.entity';
import { AttestationService } from './attestation.service';
import { AttestationController } from './attestation.controller';
import { StudentModule } from 'src/students/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attestation]),
    StudentModule
  ],
  providers: [AttestationService],
  exports: [AttestationService],
  controllers: [AttestationController],
})
export class AttestationModule { }
