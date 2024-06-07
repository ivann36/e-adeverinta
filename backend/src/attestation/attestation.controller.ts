// src/adeverinta/adeverinta.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AttestationService } from './attestation.service';
import { Attestation } from './attestation.entity';
import { Response } from 'express';

@Controller('certificates')
export class AttestationController {
  constructor(private readonly adeverintaService: AttestationService) {}

  @Post('generate')
  async generateCertificate(@Body() Attestation: Attestation, @Res() res: Response) {
    const filePath = await this.adeverintaService.generatePdf(  Attestation);
    res.download(filePath);
  }
}
