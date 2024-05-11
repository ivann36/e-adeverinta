import { Module } from '@nestjs/common';
import { SecretaryService } from './secretary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Secretary } from './secretary.entity';
import { SecretaryController } from './secretary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Secretary])],
  providers: [SecretaryService],
  exports: [SecretaryService],
  controllers: [SecretaryController],
})
export class SecretaryModule {}
