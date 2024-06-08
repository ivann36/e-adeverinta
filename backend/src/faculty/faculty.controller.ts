import { Controller, Put, Body, Param, ParseIntPipe, Get } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { Faculty } from './faculty.entity';

@Controller('faculty')
export class FacultyController {
    constructor(private readonly facultyService: FacultyService) { }

    @Put(':id')
    async editFaculty(
        @Param('id', ParseIntPipe) id: number,
        @Body() newFacultyData: Partial<Faculty>,
    ) {
        return this.facultyService.editFaculty(newFacultyData, id);
    }

    @Get()
    async getFaculty() {
        return this.facultyService.getFaculty();
    }
}