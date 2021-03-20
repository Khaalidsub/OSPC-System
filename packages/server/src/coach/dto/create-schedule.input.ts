import { Field, InputType, Int } from '@nestjs/graphql';
import { Days } from '@common/enums';
import { ISchedule, IWeeklySchedule } from '@common/interfaces';
import { Schedule } from 'coach/entities/schedule.entity';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateScheduleInput implements ISchedule {
  @Field(() => Days)
  day: Days;
  @Field(() => Int)
  @MinLength(0)
  @MaxLength(23)
  time_start: number;
  @Field(() => Int)
  @MinLength(1)
  @MaxLength(24)
  time_end: number;
}
@InputType()
export class CreateWeeklyScheduleInput {
  @Field(() => [Schedule])
  schedule: Schedule[];
}
