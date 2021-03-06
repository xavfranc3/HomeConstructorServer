import {
  Controller,
  UseInterceptors,
  Get,
  ClassSerializerInterceptor,
  Param,
  Body,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(Number(id), updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
