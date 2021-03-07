import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';
import { Days } from '@common/enums';

@InputType()
export class CreateLessonInput {
  @Field(() => String)
  subject: string;
  @Field(() => String)
  coach: string;
  @Field(() => Int)
  date: number;
  @Field(() => Int)
  time_start: number;
  @Field(() => Int, { defaultValue: 1, nullable: true })
  duration: number = 1;
  @Field(() => Days)
  day: Days;
}
