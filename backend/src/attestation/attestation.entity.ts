import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attestation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  purpose: string;

  @Column({ nullable: true })
  registrationNumber: string;

  @Column({ type: 'date', nullable: true })
  registrationDate: Date;

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

  @Column()
  email: string;
}
