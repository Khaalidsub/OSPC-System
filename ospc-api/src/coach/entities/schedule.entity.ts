import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Days } from '../types';

@ObjectType()
export class Schedule {
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
export class WeeklySchedule {
  @Field(() => ID)
  id: string;
  @Field(() => User, { description: 'Example field (placeholder)' })
  coach: User;
  @Field(() => Schedule, { description: 'Example field (placeholder)' })
  schedule: Schedule[];
}
