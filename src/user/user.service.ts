import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return await this.userRepository.findOne(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email: email });
    if (user) {
      return user;
    }
    throw new HttpException('Wrong credentials', HttpStatus.NOT_FOUND);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    // Weird method because of TypeOrm bug in update function with relations
    const user = await this.findUserById(id);
    if (user) {
      const updatedUser = await this.userRepository.merge(user, updateUserDto);
      await updatedUser.save();
      return updatedUser;
    }
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }
}
