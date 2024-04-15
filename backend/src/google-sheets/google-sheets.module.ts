import { Module } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { GoogleSheetsController } from './google-sheets.controller';
import { VariableModule } from 'src/variable/variable.module';
import { AttestationModule } from 'src/attestation/attestation.module';

@Module({
  imports: [VariableModule, AttestationModule],
  providers: [GoogleSheetsService],
  controllers: [GoogleSheetsController],
})
export class GoogleSheetsModule {}
