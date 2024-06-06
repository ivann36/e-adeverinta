// src/adeverinta/adeverinta.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AdeverintaService } from './adeverinta.services';
import { CreateCertificateDto } from './adeverinta.entity';
import { Response } from 'express';

@Controller('certificates')
export class AdeverintaController {
  constructor(private readonly adeverintaService: AdeverintaService) {}

  @Post('generate')
  async generateCertificate(@Body() createCertificateDto: CreateCertificateDto, @Res() res: Response) {
    const filePath = await this.adeverintaService.generatePdf(createCertificateDto);
    res.download(filePath);
  }
}
