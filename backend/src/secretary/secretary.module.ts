import { Module } from '@nestjs/common';
import { SecretaryService } from './secretary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Secretary } from './secretary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Secretary])],
  providers: [SecretaryService],
  exports: [SecretaryService],
})
export class SecretaryModule {}
