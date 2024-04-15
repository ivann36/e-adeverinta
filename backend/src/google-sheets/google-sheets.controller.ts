import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('google-sheets')
export class GoogleSheetsController {
  constructor(private sheetsService: GoogleSheetsService) {}
  @Get()
  async getNewEntries(): Promise<Array<Array<string>>> {
    try {
      const entries = await this.sheetsService.getNewEntries();
      return entries;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Encountered error while obtaining new Attestations',
      );
    }
  }
}
