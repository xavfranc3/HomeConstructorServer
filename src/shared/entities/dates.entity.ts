import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  forecastStartDate: Date;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  forecastEndDate: Date;

  @Column({ nullable: true })
  endDate: Date;
}
