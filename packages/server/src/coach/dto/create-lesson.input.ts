import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';
import { Days } from '@common/enums';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field(() => String)
  subject: string;
  @Field(() => String)
  coach: string;
  @Field(() => Int)
  date: number;
  @Field(() => Int)
  @MaxLength(24)
  time_start: number;
  @Field(() => Int, { defaultValue: 1, nullable: true })
  @MaxLength(1)
  duration: number = 1;
  @Field(() => Days)
  day: Days;
}
