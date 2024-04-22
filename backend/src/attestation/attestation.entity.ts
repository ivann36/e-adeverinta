import { Student } from 'src/students/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Student, (Student) => Student.attestations)
  soliciters: Student;
}
