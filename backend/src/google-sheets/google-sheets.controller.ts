import { Controller, Get, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from 'src/google-auth/google-auth.guard';

@Controller('google-sheets')
@UseGuards(GoogleAuthGuard)
export class GoogleSheetsController {
  constructor(private sheetsService: GoogleSheetsService) {}
  @UseGuards(GoogleAuthGuard)
  @Get()
  async getNewEntries(): Promise<Array<Array<string>> | { error: string }> {
    try {
      const entries = await this.sheetsService.getNewEntries();
      return entries;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error fetching new entries');
    }
  }
}
