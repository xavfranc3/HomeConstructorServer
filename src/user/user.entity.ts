import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
