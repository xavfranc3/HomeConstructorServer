import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
