import { User } from 'src/user/user.entity';
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

  @ManyToOne(() => User, (user) => user.attestations)
  soliciters: User;
}
