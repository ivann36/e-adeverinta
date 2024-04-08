import { Attestation } from 'src/attestation/attestation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ type: 'character' })
  fatherInitial: string;

  @Column()
  studyForm: string;

  @Column()
  studyType: string;

  @Column()
  studyYear: number;

  @Column({ type: 'character' })
  gender: string;

  @OneToMany(() => Attestation, (attestation) => attestation.soliciters)
  attestations: Attestation[];
}
