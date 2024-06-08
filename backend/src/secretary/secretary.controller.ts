import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SecretaryDto } from './secretary.dto';
import { SecretaryService } from './secretary.service';

@Controller('secretary')
export class SecretaryController {
  constructor(private secretaryService: SecretaryService) { }

  @Get('all')
  async getAll() {
    return await this.secretaryService.getList();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.secretaryService.getSecretary(id);
  }

  @Post('create')
  async create(@Body() secretary: SecretaryDto) {
    try {
      await this.secretaryService.addSecretary(secretary);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while adding new secretary',
      );
    }
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() secretary: SecretaryDto) {
    try {
      await this.secretaryService.editSecretary(id, secretary);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while editing secretary info',
      );
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    try {
      await this.secretaryService.deleteSecretary(id);
    } catch (error) {
      throw new InternalServerErrorException('Error while deleting secretary');
    }
  }

}
