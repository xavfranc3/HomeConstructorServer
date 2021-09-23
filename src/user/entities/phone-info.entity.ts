import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PhoneInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  hardLineNumber: string;

  @Column({ nullable: true })
  cellNumber: string;

  @Column({ nullable: true })
  otherNumber: string;

  @OneToOne(() => User, (user: User) => user.phoneInfo)
  user: User;
}
