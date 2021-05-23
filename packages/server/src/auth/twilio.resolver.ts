
import {
    ConflictException,
    UnauthorizedException,
    UseGuards,
  } from '@nestjs/common';
  import { Args, Mutation, Resolver } from '@nestjs/graphql';

  import {
    EmailVerificationArgs,
    PhoneArgs,
    PhoneVerificationArgs,
    ResetPasswordArgs,
    SendVerificationCodeArgs,
    UpdateResponse,
    VerificationArgs,
  } from 'types';
import { User } from 'users/entities/user.entity';
import { UsersService } from 'users/users.service';
  import { AuthService } from './auth.service';
  import { VerificationResponse } from './entities/verification-response.entity';
  import { CurrentUser, GqlAuthGuard } from './guards/graph-auth.guard';
  import { TwilioService } from './twilio.service';
import { VerificationChannel } from './types';
  
  @Resolver(() => User)
  export class TwilioResolver {
    constructor(
      private authService: AuthService,
      private usersService: UsersService,
      private twilioService: TwilioService,
    ) {}
  
    @Mutation(() => VerificationResponse, {
      deprecationReason: 'Use sendVerificationCode Instead',
    })
    async sendSMSVerificationCode(
      @Args() { phoneNumber }: PhoneArgs,
    ): Promise<VerificationResponse> {
      try {
        const result = await this.twilioService.requestCode(phoneNumber);
  
        return result;
      } catch (error) {
        throw new Error('Invalid phone number');
      }
    }
    @Mutation(() => VerificationResponse, {
      description:
        'Sends Verification Code to a channel depending on whether it is a phoneNumber of or email entered',
    })
    async sendVerificationCode(
      @Args()
      verificationArgs: SendVerificationCodeArgs,
    ) {
      try {
        const { email, phoneNumber } = verificationArgs;
        if (!email && !phoneNumber) {
          throw new Error(
            'Enter either email or a phonenumber to send a verification code',
          );
        }
  
        const result = await this.twilioService.requestCode(
          email || phoneNumber,
          this.verificationChannel({ email, phoneNumber }),
        );
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    }
    verificationChannel({ email, phoneNumber }: any): VerificationChannel {
      if (phoneNumber) {
        return VerificationChannel.sms;
      }
      if (email) {
        return VerificationChannel.email;
      }
      return null;
    }
  
    verifyChannelCode({ input, code }: { input: string; code: string }) {
      try {
        return this.twilioService.verifyCode(code, input);
      } catch (error) {
        throw new Error('Invalid verification code');
      }
    }
  
    @Mutation(() => String)
    async loginViaPhoneVerificationCode(
      @Args() phoneVerificationArgs: PhoneVerificationArgs,
    ) {
      try {
        const response = await this.verifyChannelCode({
          ...phoneVerificationArgs,
          input: phoneVerificationArgs.phoneNumber,
        });
        if (response.status !== 'approved') {
          throw new UnauthorizedException('Invalid phone verification');
        }
  
        const user = await this.usersService.findOne({
          phoneNumber: phoneVerificationArgs.phoneNumber,
        });
  
        return this.authService.login({ email: user.email, sub: user.id });
      } catch (error) {
        throw new Error(error.message);
      }
    }
    @Mutation(() => UpdateResponse)
    @UseGuards(GqlAuthGuard)
    async updatePhoneNumber(
      @CurrentUser() user: User,
      @Args() phoneVerificationArgs: PhoneVerificationArgs,
    ) {
      try {
        const response = await this.verifyChannelCode({
          ...phoneVerificationArgs,
          input: phoneVerificationArgs.phoneNumber,
        });
        if (response.status !== 'approved') {
          throw new UnauthorizedException('invalid phone verification');
        }
  
        const count = await this.usersService.countByQuery({
          phoneNumber: phoneVerificationArgs.phoneNumber,
        });
  
        if (count !== 0)
          throw new ConflictException('Phone number is already registered');
  
        const result = await this.usersService.update(user.id, {
          phoneNumber: phoneVerificationArgs.phoneNumber,
        });
  
        if (result.isModified('phoneNumber'))
          return { message: 'Phone number was not updated' };
  
        return { message: 'Phone number has been updated' };
      } catch (error) {
        throw new Error(error.message);
      }
    }
    @Mutation(() => UpdateResponse)
    @UseGuards(GqlAuthGuard)
    async updateEmail(
      @CurrentUser() user: User,
      @Args() emailVerificationArgs: EmailVerificationArgs,
    ) {
      try {
        const response = await this.verifyChannelCode({
          ...emailVerificationArgs,
          input: emailVerificationArgs.email,
        });
        if (response.status !== 'approved') {
          throw new UnauthorizedException('invalid email verification');
        }
  
        const count = await this.usersService.countByQuery({
          email: emailVerificationArgs.email,
        });
  
        if (count !== 0)
          throw new ConflictException('Email is already registered');
  
        const result = await this.usersService.update(user.id, {
          email: emailVerificationArgs.email,
        });
  
        if (result.isModified('email')) return { message: 'Email was not updated' };
  
        return { message: 'Email has been updated' };
      } catch (error) {
        throw new Error(error.message);
      }
      // get the verification code with the new email
      // verify the code
      // check if email already exists
      // update the email
      // update the jwt token
    }
  
    @Mutation(() => String, {
      description:
        'Returns login JWT token after verifying the verification code sent via email',
    })
    async verifyEmailRegistration(
      @Args() emailVerificationArgs: EmailVerificationArgs,
    ) {
      try {
        const response = await this.verifyChannelCode({
          ...emailVerificationArgs,
          input: emailVerificationArgs.email,
        });
        if (response.status !== 'approved') {
          throw new UnauthorizedException('Email is already registered');
        }
  
        const user = await this.usersService.findOne({
          email: emailVerificationArgs.email,
        });
  
        await this.usersService.update(user.id, { isEmailVerified: true });
  
        return this.authService.login({ email: user.email, sub: user.id });
      } catch (error) {
        throw new Error(error.message);
      }
    }
    @Mutation(() => String, {
      description: 'Returns a Reset JWT after verifying Verification Code',
    })
    async verifyResetPasswordCode(@Args() verificationArgs: VerificationArgs) {
      const { email, phoneNumber, code } = verificationArgs;
      try {
        const response = await this.verifyChannelCode({
          code,
          input: email || phoneNumber,
        });
  
        if (response.status !== 'approved') {
          throw new UnauthorizedException('phone number verification invalid');
        }
  
        const propertyName = email ? 'email' : 'phoneNumber';
  
        return this.authService.createResetToken({
          [propertyName]: email || phoneNumber,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    @Mutation(() => String, {
      description:
        'Returns a Login JWT after verifying Reset Token and new Password',
    })
    async resetPassword(@Args() resetPasswordArgs: ResetPasswordArgs) {
      try {
        const result: any = await this.authService.verifyResetToken(
          resetPasswordArgs.resetToken,
        );
        delete result.iat;
        delete result.exp;
        // console.log('in reset passowrd', result);
  
        const user = await this.usersService.findOne({
          ...result,
        });
        user.password = resetPasswordArgs.password;
        await user.hashPassword();
  
        await this.usersService.update(user.id, { password: user.password });
  
        return this.authService.login({ email: user.email, sub: user.id });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
  