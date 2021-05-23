import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { REG_PASSWORD } from '@common/utils';
// import { VerificationChannel } from '@ospc/common';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  Matches,
  MinLength,
} from 'class-validator';
enum VerificationChannel{
  sms = 'sms',
  email = 'email'
}
@ArgsType()
export class PhoneArgs {
  @Field(() => String)
  @IsPhoneNumber('MY', {
    message: 'Phone number must be a valid malaysian number',
  })
  phoneNumber: string;
}

registerEnumType(VerificationChannel, {
  name: 'ChannelMedium',
  description: 'Field for type of medium to use to verify',
});
@ArgsType()
export class PhoneVerificationArgs {
  @Field(() => String)
  @IsPhoneNumber('MY', {
    message: 'Phone number must be a valid malaysian number',
  })
  phoneNumber: string;

  @Field(() => String)
  code: string;
}

@ArgsType()
export class ResetPasswordArgs {
  @Field(() => String)
  @MinLength(6)
  @Matches(REG_PASSWORD, { message: 'password too weak' })
  password: string;
  @Field(() => String)
  resetToken: string;
}
@ArgsType()
export class EmailVerificationArgs {
  @Field(() => String)
  @IsEmail()
  email: string;
  @Field(() => String)
  code: string;
}

@ArgsType()
export class SendVerificationCodeArgs {
  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
  @Field(() => String, { nullable: true })
  @IsPhoneNumber('MY')
  @IsOptional()
  phoneNumber?: string;
}

@ArgsType()
export class VerificationArgs {
  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
  @Field(() => String, { nullable: true })
  @IsPhoneNumber('MY')
  @IsOptional()
  phoneNumber?: string;

  @Field()
  code: string;
}
