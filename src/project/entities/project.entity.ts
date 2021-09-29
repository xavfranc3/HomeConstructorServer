import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  forecastStartDate: Date;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  constructionForecastStartDate: Date;

  @Column({ nullable: true })
  constructionStartDate: Date;

  @Column({ nullable: true })
  constructionForecastEndDate: Date;

  @Column({ nullable: true })
  constructionEndDate: Date;

  @Exclude()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (owner: User) => owner.projects)
  owner: User;
}
