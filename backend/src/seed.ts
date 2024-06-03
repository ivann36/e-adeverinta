import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AdminService } from './admin/admin.service';
import { StudentModule } from './students/student.module';
import { Attestation } from 'src/attestation/attestation.entity';

async function bootstrap() {
    const application = await NestFactory.createApplicationContext(
        AppModule,
    );

    const command = process.argv[2];

    switch (command) {
        case 'create-admin':
            const usersService = application.get(AdminService);
            await usersService.create({
                name: 'admin',
                password: 'admin',
            });
            break;
        default:
            console.log('Command not found');
            process.exit(1);
    }

    await application.close();
    process.exit(0);
}

bootstrap();
