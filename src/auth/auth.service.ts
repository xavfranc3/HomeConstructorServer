import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, plainTextPassword: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    const matchingPassword = await AuthService.verifyPassword(
      plainTextPassword,
      user.password,
    );
    if (!matchingPassword)
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    return user;
  }

  private static async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
