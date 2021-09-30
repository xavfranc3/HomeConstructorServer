import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Project } from '../../project/entities/project.entity';

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

  @OneToOne(() => Project, (project: Project) => project.projectPlanning)
  project: Project;
}
