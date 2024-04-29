import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Secretary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  surname: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column()
  refreshToken: string;
}
