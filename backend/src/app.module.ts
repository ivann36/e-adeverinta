import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './students/student.module';
import { AttestationModule } from './attestation/attestation.module';
import { VariableModule } from './variable/variable.module';
// leaking memory https://github.com/googleapis/google-api-nodejs-client/issues/2187
// import { GoogleSheetsModule } from './google-sheets/google-sheets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { SecretaryModule } from './secretary/secretary.module';
import { FacultyModule } from './faculty/faculty.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.sqlite',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../env/.env',
    }),
    StudentModule,
    AttestationModule,
    VariableModule,
    // GoogleSheetsModule,
    GoogleAuthModule,
    AdminModule,
    AuthModule,
    SecretaryModule,
    FacultyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
