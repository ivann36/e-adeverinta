import { Controller, Get } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('google-sheets')
export class GoogleSheetsController {
  constructor(private sheetsService: GoogleSheetsService) {}
  // @Get()
  // async getNewEntries(): Promise<Array<Array<string>> | { error: string }> {
  //   try {
  //     const entries = await this.sheetsService.getNewEntries();
  //     return entries;
  //   } catch (error) {
  //     return {
  //       error: 'Encountered error while obtaining new Attestations',
  //     };
  //   }
  // }
}
