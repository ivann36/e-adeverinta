import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as QRCode from 'qrcode';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { Attestation } from './attestation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttestationService {
  constructor(
    @InjectRepository(Attestation)
    private attestationRepository: Repository<Attestation>,
  ) {}

  async generatePdf(Attestation: Attestation): Promise<string> {
    const { studentName, universityYear, studyYear, studyProgram, studyForm, feeStatus, purpose } = Attestation;

    // Create PDF document
    const doc = new PDFDocument();
    const fileName = `certificate_${studentName}.pdf`;
    const filePath = join(process.cwd(), 'certificates', fileName);
    doc.pipe(createWriteStream(filePath));

    doc.fontSize(16).text('UNIVERSITATEA „ŞTEFAN CEL MARE” DIN SUCEAVA', { align: 'center' });
    doc.fontSize(16).text('FACULTATEA DE INGINERIE ELECTRICĂ ŞI ŞTIINŢA CALCULATOARELOR', { align: 'center' });

    doc.moveDown();
    doc.fontSize(14).text(`Studentul (a) ${studentName} este înscris(ă) în anul universitar ${universityYear}, în anul ${studyYear} de studii, program / domeniu de studii - licență: ${studyProgram}, forma de învățământ ${studyForm}, regim: ${feeStatus} cu taxă / fără taxă.`);
    doc.moveDown();
    doc.text(`Adeverința se eliberează pentru a-i servi la ${purpose}.`);

    doc.moveDown();
    doc.text('D E C A N,', { continued: true, align: 'left' });
    doc.text('SECRETAR ȘEF,', { align: 'center' });
    doc.text('SECRETARIAT,', { align: 'right' });

    // Generate QR Code
    const qrCodeData = `Student: ${studentName}, Year: ${universityYear}, Program: ${studyProgram}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    doc.image(qrCodeImage, {
      fit: [100, 100],
      align: 'center',
      valign: 'center'
    });

    doc.end();

    return filePath;
  }

  addNewEntries(attestations: Array<Attestation>) {
    attestations.forEach((attestation) => {
      this.attestationRepository.save(attestation);
    });
  }
}
