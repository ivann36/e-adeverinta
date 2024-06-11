import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    constructor(
        private configService: ConfigService,
    ) { }
    
    async sendEmail() {
        // Send email
    }
}
