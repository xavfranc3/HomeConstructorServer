import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  streetNumber: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  professionalEmail: string;

  @OneToOne(() => User, (user: User) => user.address)
  user: User;
}
