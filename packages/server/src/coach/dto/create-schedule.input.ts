import { Field, InputType, Int } from '@nestjs/graphql';
import { Days } from '@common/enums';
import { ISchedule, IWeeklySchedule } from '@common/interfaces';
import { Schedule } from 'coach/entities/schedule.entity';

@InputType()
export class CreateScheduleInput implements ISchedule {
  @Field(() => Days)
  day: Days;
  @Field(() => Int)
  time_start: number;
  @Field(() => Int)
  time_end: number;
}
@InputType()
export class CreateWeeklyScheduleInput implements IWeeklySchedule {
  @Field(() => [Schedule])
  schedule: Schedule[];
}
