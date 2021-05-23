import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateResponse {
  @Field(() => String)
  message: string;
}
