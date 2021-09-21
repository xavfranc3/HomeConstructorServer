import { Controller, UseInterceptors } from "@nestjs/common";
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors()
export class UserController {
  constructor(private readonly userService: UserService) {}
}
