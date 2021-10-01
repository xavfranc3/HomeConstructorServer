import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import RequestWithUser from '../../auth/requestWithUser.interface';

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    if (!request.user?.isEmailConfirmed) {
      throw new UnauthorizedException(
        'Please confirm your email address first.',
      );
    }
    return true;
  }
}
