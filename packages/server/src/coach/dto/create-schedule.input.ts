import { Field, InputType, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Schedule } from '../entities/schedule.entity';
import { Days, ISchedule, IWeeklySchedule } from '../types';

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
  @Field(() => [ISchedule])
  schedule: ISchedule[];
}
