import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariableService } from './variable.service';
import { Variable } from './variable.entity';
import { VariableController } from './variable.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Variable])],
  providers: [VariableService],
  exports: [VariableService],
  controllers: [VariableController],
})
export class VariableModule {}
