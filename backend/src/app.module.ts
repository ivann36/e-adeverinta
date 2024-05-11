import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './students/student.module';
import { AttestationModule } from './attestation/attestation.module';
import { VariableModule } from './variable/variable.module';
import { GoogleSheetsModule } from './google-sheets/google-sheets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { SecretaryModule } from './secretary/secretary.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: 'db/sql.sqlite',
        synchronize: true,
        autoLoadEntities: true,
        seeds: [],
      }),

      // Use useFactory, useClass, or useExisting
      // to configure the DataSourceOptions.
      //
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../env/.env',
    }),
    StudentModule,
    AttestationModule,
    VariableModule,
    GoogleSheetsModule,
    GoogleAuthModule,
    AdminModule,
    AuthModule,
    SecretaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
