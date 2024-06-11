import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminFileService } from './admin-file.service';
import { StudentModule } from 'src/students/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    StudentModule,
  ],
  providers: [AdminService, AdminFileService],
  exports: [AdminService, AdminFileService],
  controllers: [AdminController],
})
export class AdminModule { }
