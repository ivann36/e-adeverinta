import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { AttestationService } from './attestation.service';
import { Attestation } from './attestation.entity';
import { AttestationDto } from './attestation.dto';
import { StudentService } from 'src/students/student.service';
import { StudentDto } from 'src/students/student.dto';
import { GoogleAuthGuard } from 'src/google-auth/google-auth.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('attestation')
@UseGuards(GoogleAuthGuard)
export class AttestationController {
    constructor(
        private readonly attestationService: AttestationService,
    ) { }

    @Post()
    async addNewEntries(@Body() attestations: AttestationDto[]) {
        this.attestationService.addNewEntries(attestations);
    }

    @Post('single')
    async addNewEntry(@Body() attestation: AttestationDto) {
        this.attestationService.addNewEntry(attestation);
    }

    @Get()
    async listAll() {
        console.log('listAll')
        return await this.attestationService.listAll();
    }

    @Get('approved')
    async listApproved() {
        return await this.attestationService.listApproved();
    }

    @Get('unapproved')
    async listUnapproved() {
        return await this.attestationService.listUnapproved();
    }

    @Get('rejected')
    async listRejected() {
        return await this.attestationService.listRejected();
    }

    @Patch('approve/:id')
    async approveAttestation(@Param('id') id: number) {
        await this.attestationService.approve(id);
    }

    @Patch('unaprove/:id')
    async unapproveAttestation(@Param('id') id: number) {
        await this.attestationService.unapprove(id);
    }

    @Patch('reject/:id')
    async rejectAttestation(@Param('id') id: number) {
        await this.attestationService.reject(id);
    }
}