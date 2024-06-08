import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AdminService } from './admin/admin.service';
import * as bycrpt from 'bcrypt';
import { SecretaryService } from './secretary/secretary.service';
import { SecretaryDto } from './secretary/secretary.dto';

async function bootstrap() {
    const application = await NestFactory.createApplicationContext(
        AppModule,
    );

    const command = process.argv[2];
    const email = process.argv[3];

    switch (command) {
        case 'create-admin':
            const usersService = application.get(AdminService);
            await usersService.create({
                id: 1,
                name: 'admin',
                password: await bycrpt.hash('admin', 4),
            });
            break;
        case 'create-secretary':
            const secretaryService = application.get(SecretaryService);
            const newSecretary = new SecretaryDto();
            newSecretary.email = email;
            newSecretary.name = 'Secretary';
            newSecretary.surname = 'Surname';
            newSecretary.title = 'Developer';
            await secretaryService.addSecretary(newSecretary);
            break;
        default:
            console.log('Command not found');
            process.exit(1);
    }

    await application.close();
    process.exit(0);
}

bootstrap();
