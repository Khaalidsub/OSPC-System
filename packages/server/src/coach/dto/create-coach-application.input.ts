import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCoachApplicationInput {
  @Field(() => String)
  description: string;
  @Field(() => [String], { nullable: true })
  urls: string[];
  user: string;
}
