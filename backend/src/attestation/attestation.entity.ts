import { Student } from '../students/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Attestation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  purpose: string;

  @Column({ nullable: true })
  registrationNumber: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  status: string;

  @ManyToOne(() => Student, (Student) => Student.attestations)
  soliciter: Student;
}
