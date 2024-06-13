import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from 'src/google-auth/google-auth.guard';

@Controller('student')
@UseGuards(GoogleAuthGuard)
export class StudentController {
  constructor(private studentService: StudentService) { }

  @Get('all')
  async getAll(@Query('limit') limit: number, @Query('offset') offset: number) {
    return await this.studentService.getAllStudents(limit, offset);
  }

  @Get(':id')
  async getStudentById(@Param('id') id: number) {
    return await this.studentService.getStudentById(id);
  }

  @Post()
  async createStudent(@Body() studentData: StudentDto) {
    return await this.studentService.createStudent(studentData);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') id: number,
    @Body() studentData: StudentDto,
  ) {
    return await this.studentService.updateStudent(id, studentData);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: number) {
    return await this.studentService.deleteStudent(id);
  }
}
