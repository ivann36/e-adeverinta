import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AttestationModule } from './attestation/attestation.module';
import { VariableModule } from './variable/variable.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.sqlite',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AttestationModule,
    VariableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
