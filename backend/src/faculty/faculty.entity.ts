import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Faculty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  shortName: string;

  @Column()
  currentAcademicYear: string;

  @Column()
  deanName: string;

  @Column()
  chiefSecretaryName: string;
}