import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';
import { Days } from '@common/enums';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field(() => String)
  subject: string;
  @Field(() => String)
  coach: string;
  @Field(() => Number)
  date: number;
  @Field(() => Number)
  time_start: number;
  @Field(() => Int, { defaultValue: 1, nullable: true })
  duration: number = 1;
  @Field(() => Days)
  day: Days;
  @Field()
  timeZone: string
}
