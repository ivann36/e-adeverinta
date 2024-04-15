import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, sheets_v4 } from 'googleapis';
import { JWT } from 'google-auth-library';
import { VariableService } from 'src/variable/variable.service';
import { AttestationService } from 'src/attestation/attestation.service';
import { Attestation } from 'src/attestation/attestation.entity';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

@Injectable()
export class GoogleSheetsService {
  client: JWT;
  sheets: sheets_v4.Sheets;
  spreadsheetId: string;
  constructor(
    private configService: ConfigService,
    private variableService: VariableService,
    private attestationService: AttestationService,
  ) {
    this.client = new google.auth.JWT({
      email: this.configService.get('CLIENT_EMAIL'),
      key: this.configService.get('PRIVATE_KEY').replace(/\\n/g, '\n'),
      keyFile: null,
      scopes: SCOPES,
    });
    this.client.authorize(async (error) => {
      if (!error) {
        console.log('Connected');
        this.sheets = google.sheets({
          version: 'v4',
          auth: this.client,
        });
      }
    });
    this.spreadsheetId = configService.get('SPREADSHEET_ID');
  }
  async getNewEntries() {
    const lastEntryNumber = await this.variableService.getLastEntryNumber();
    const tableSizeResponse = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'Form Responses 1!K2',
    });
    const tableSize = Number(tableSizeResponse.data.values[0][0]);
    if (lastEntryNumber == tableSize) {
      return [];
    }
    const entries = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `Form Responses 1!A${lastEntryNumber + 1}:H${tableSize}`,
    });
    const attestations: Array<Attestation> = [];
    console.log(lastEntryNumber, tableSize, entries.data.values);
    entries.data.values.forEach((attestation) => {
      const newAttestation = new Attestation();
      newAttestation.email = attestation[1];
      newAttestation.studentName = attestation[2];
      newAttestation.studyYear = attestation[3];
      newAttestation.studyProgram = attestation[4];
      newAttestation.studyForm = attestation[5];
      newAttestation.purpose = attestation[6];
      newAttestation.gender = attestation[7];
      attestations.push(newAttestation);
    });

    this.attestationService.addNewEntries(attestations);
    this.variableService.setLastEntryNumber(tableSize);
    return entries.data.values;
  }
}
