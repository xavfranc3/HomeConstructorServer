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
import { Address } from '../../shared/entities/address.entity';
import { PhoneInfo } from '../../shared/entities/phone-info.entity';

export enum constructionType {
  IndividualHouse = 'Individual house',
  Flat = 'Flat',
  Building = 'Building',
  Office = 'Office',
  Pool = 'Pool',
  Landscape = 'Landscape',
  Extension = 'Extension',
}

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: constructionType,
    default: constructionType.IndividualHouse,
  })
  constructionType: string;

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

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  projectAddress: Address;

  @OneToOne(() => PhoneInfo, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  phoneInfo: Address;
}
