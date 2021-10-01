import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';

@Module({
  imports: [
    ConfigModule,
    EmailModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(
          'JWT_VERIFICATION_TOKEN_SECRET=99bottlesOfBeer',
        ),
        signOptions: {
          expiresIn: configService.get(
            'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
          ),
        },
      }),
    }),
  ],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
