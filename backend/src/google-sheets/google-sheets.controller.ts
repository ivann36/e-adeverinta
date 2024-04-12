import { Controller, Get } from '@nestjs/common';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

@Controller('google-sheets')
export class GoogleSheetsController {
  client: JWT;
  constructor(private configService: ConfigService) {
    this.client = new google.auth.JWT(
      this.configService.get('CLIENT_EMAIL'),
      null,
      this.configService.get('PRIVATE_KEY'),
      SCOPES,
    );
  }
  @Get()
  testing(): string {
    this.client.authorize(async (error) => {
      if (!error) {
        console.log('Connected');
        const googleSheetApi = google.sheets({
          version: 'v4',
          auth: this.client,
        });
        const readOptions = {
          spreadsheetId: this.configService.get('SPREADSHEET_ID'),
          range: 'Form Responses 1!A3:C3',
        };
        const dataFromSheet =
          await googleSheetApi.spreadsheets.values.get(readOptions);
        console.log(dataFromSheet.data.values);
      }
    });
    return 'testing';
  }
}
