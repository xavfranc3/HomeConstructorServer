import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
import { VerificationTokenPayloadInterface } from './verificationTokenPayload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  sendVerificationLink(email: string) {
    const payload: VerificationTokenPayloadInterface = { email };
    const token = this.jwtService.sign(payload);
    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;
    const text = `Welcome to the application. To confirm your email address, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email Confirmation',
      text,
    });
  }

  async confirmEmail(email: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.markEmailAsConfirmed(email);
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token);
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
    } catch (err) {
      if (err?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation link expired');
      }
      throw new BadRequestException('Link is faulty');
    }
  }

  async resendConfirmationLink(id: number) {
    const user = await this.userService.findUserById(id);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(user.email);
  }
}
