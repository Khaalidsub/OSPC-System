import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { Twilio } from 'twilio';
import { TwilioResolver } from './twilio.resolver';
import { TwilioService } from './twilio.service';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20d' },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver,
    
    TwilioResolver,
    TwilioService,
    {
      provide: 'TwilioClient',
      useValue: new Twilio(process.env.TWILIO_USER, process.env.TWILIO_PASS),
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
