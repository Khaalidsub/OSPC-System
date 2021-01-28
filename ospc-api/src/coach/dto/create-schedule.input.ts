import { Field, InputType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Schedule } from '../entities/schedule.entity';
import { Days, ISchedule, IWeeklySchedule } from '../types';

@InputType()
export class CreateScheduleInput implements ISchedule {
  @Field(() => Days)
  day: Days;
  @Field(() => Number)
  time_start: number;
  @Field(() => Number)
  time_end: number;
}
@InputType()
export class CreateWeeklyScheduleInput implements IWeeklySchedule {
  @Field(() => String)
  coach?: string;
  @Field(() => [Schedule])
  schedule: Schedule[];
}