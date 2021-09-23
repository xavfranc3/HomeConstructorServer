import {
  Controller,
  UseInterceptors,
  Get,
  ClassSerializerInterceptor,
  Body,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/index')
  indexUsers() {
    return this.userService.indexUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(Number(id));
  }

  @Post('/register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}
