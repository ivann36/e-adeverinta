import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { VariableService } from './variable.service';
import { VariableDto } from './variable.dto';

@Controller('variable')
export class VariableController {
  constructor(private variableService: VariableService) {}
  @Post('start-index')
  async setStartIndex(@Body() variableDto: VariableDto) {
    console.log(variableDto, variableDto.value);
    try {
      await this.variableService.setLastEntryNumber(variableDto.value);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Encountered error while changing starting index for spreadsheet',
      );
    }
  }
}
