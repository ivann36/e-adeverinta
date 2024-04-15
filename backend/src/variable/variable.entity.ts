import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Variable {
  @PrimaryColumn()
  name: string;

  @Column()
  value: number;
}
