import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PostgresErrorCodeEnum } from '../database/postgresErrorCode.enum';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      return this.userService.registerUser(createUserDto);
    } catch (e) {
      if (e?.code === PostgresErrorCodeEnum.UniqueViolation) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

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

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
