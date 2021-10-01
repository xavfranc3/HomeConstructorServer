import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  streetNumber: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  other: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  professionalEmail: string;
}
