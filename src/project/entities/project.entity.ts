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
