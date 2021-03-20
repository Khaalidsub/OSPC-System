import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, Matches } from 'class-validator';
import { invalidEmailError, REG_PASSWORD } from '@common/utils';
@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  university: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  @Matches(REG_PASSWORD, { message: 'Password Too Weak' })
  password?: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsEmail({}, { message: invalidEmailError })
  email: string;
  // @Field(() => String, { description: 'Example field (placeholder)' })
  // @IsPhoneNumber()
  // phoneNumber: string;
  // @Field(() => String, { description: 'Example field (placeholder)' })
  // universityId: string;
}
