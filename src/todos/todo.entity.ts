import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('boolean')
  status: boolean;
}
