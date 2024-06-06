// src/app.module.ts
import { Module } from '@nestjs/common';
import { AdeverintaController } from './adeverinta.controller';
import { AdeverintaService } from './adeverinta.services';

@Module({
  imports: [],
  controllers: [AdeverintaController],
  providers: [AdeverintaService],
})
export class AppModule {}
