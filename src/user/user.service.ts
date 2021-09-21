import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  indexUsers() {
    return this.userRepository.find();
  }

  async registerUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await user.save();
    return user;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.find({ email: email });
    return user;
  }
}
