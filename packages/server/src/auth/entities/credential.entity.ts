import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { REG_PASSWORD } from '@common/utils';
import { IsEmail, Matches } from 'class-validator';
import { ICredential } from '../types';
@ObjectType()
@InputType()
export class Credential implements ICredential {
  @Field(() => String, { description: 'Example field (placeholder)' })
  @Matches(REG_PASSWORD)
  password: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  @IsEmail()
  email: string;
}
