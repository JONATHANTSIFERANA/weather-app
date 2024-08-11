import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm/browser';

@Entity('region')
export class Region {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('text')
  name = '';
}
