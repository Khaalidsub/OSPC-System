import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerificationResponse  {
  @Field(() => GraphQLISODateTime, {})
  dateCreated: Date;
  @Field(() => GraphQLISODateTime, {})
  dateUpdated: Date;
  @Field(() => String, {})
  status: string;
  @Field(() => String, { description: 'Field Phonenumber' })
  to: string;
  @Field(() => Boolean, { description: '' })
  valid: boolean;
}
