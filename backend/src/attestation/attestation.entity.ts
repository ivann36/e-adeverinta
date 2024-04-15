import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attestation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  purpose: string;

  @Column()
  registrationNumber: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  studentName: string;

  @Column()
  studyForm: string;

  @Column()
  studyProgram: string;

  @Column()
  studyYear: string;

  @Column()
  gender: string;
}
