import {
  Controller,
  UseInterceptors,
  Get,
  ClassSerializerInterceptor,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';

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
}
