import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IUser } from '../../users/types';
import { User } from '../../users/entities/user.entity';
import { Days, ISchedule, IWeeklySchedule } from '../types';

@ObjectType()
export class Schedule implements ISchedule {
  @Field(() => ID)
  id: string;
  @Field(() => Days)
  day: Days;
  @Field(() => Number)
  time_start: number;
  @Field(() => Number)
  time_end: number;
}

@ObjectType()
export class WeeklySchedule implements IWeeklySchedule {
  @Field(() => ID)
  id: string;
  @Field(() => IUser, { description: 'Example field (placeholder)' })
  coach: IUser;
  @Field(() => [ISchedule], { description: 'Example field (placeholder)' })
  schedule: ISchedule[];
}
