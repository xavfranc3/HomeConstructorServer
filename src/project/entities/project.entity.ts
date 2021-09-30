import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../../user/entities/user.entity';
import { Dates } from '../../shared/entities/dates.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @OneToOne(() => Dates, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  projectPlanning: Dates;
}
