import { Controller, Put, Body, Param, ParseIntPipe, Get, UseGuards } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { Faculty } from './faculty.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('faculty')
@UseGuards(AuthGuard)
export class FacultyController {
    constructor(private readonly facultyService: FacultyService) { }
    @Put(':id')
    async editFaculty(
        @Param('id', ParseIntPipe) id: number,
        @Body() newFacultyData: Partial<Faculty>,
    ) {
        console.log(newFacultyData, id);
        return this.facultyService.editFaculty(newFacultyData, id);
    }

    @Get()
    async getFaculty() {
        return this.facultyService.getFaculty();
    }
}