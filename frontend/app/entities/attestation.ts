export interface Attestation {
    id: number;
    purpose: string;
    registrationNumber?: string;
    date: Date;
    status: string;
    soliciter: number;
}