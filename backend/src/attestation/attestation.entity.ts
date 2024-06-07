import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from 'src/students/student.entity';

@Entity()
export class Attestation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentName: string;

  @Column()
  universityYear: string;

  @Column()
  studyYear: string;

  @Column()
  studyProgram: string;

  @Column()
  studyForm: string;

  @Column()
  feeStatus: string;

  @Column()
  purpose: string;

  @ManyToOne(() => Student, (Student) => Student.attestations)
  soliciters: Student;
}
