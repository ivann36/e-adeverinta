import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariableService } from './variable.service';
import { Variable } from './variable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Variable])],
  providers: [VariableService],
})
export class VariableModule {}
