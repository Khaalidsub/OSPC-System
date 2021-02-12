import {
  Field,
  InputType,
  Int,
  InterfaceType,
  registerEnumType,
} from '@nestjs/graphql';
import { ISubject } from '../../subjects/types';
import { User } from '../../users/entities/user.entity';
import { IUser } from '../../users/types';

export enum Days {
  monday = 'MON',
  tuesday = 'TUE',
  wednesday = 'WED',
  thursday = 'Thu',
  friday = 'FRI',
  saturday = 'SAT',
  sunday = 'SUN',
}

export type DaySchedule = {
  day: Days;
  time_start: number;
  time_end: number;
};

registerEnumType(Days, { name: 'Day' });

@InterfaceType()
export abstract class ISubjectDescription {
  @Field(() => String)
  description: string;
  @Field(() => String)
  title: string;
}
@InterfaceType()
export abstract class ISubjectSpecialization {
  @Field(() => ISubjectDescription)
  specialization: ISubjectDescription[];
  @Field(() => ISubject)
  subject: ISubject;
  @Field(() => IUser)
  coach?: IUser | string;
}
@InterfaceType()
@InputType('ScheduleTypeInput')
export abstract class ISchedule {
  @Field(() => Days)
  day: Days;
  @Field(() => Int)
  time_start: number;
  @Field(() => Int)
  time_end: number;
}
@InterfaceType()
export abstract class IWeeklySchedule {
  @Field(() => IUser, { nullable: true })
  coach?: IUser | string;
  @Field(() => ISchedule)
  schedule: ISchedule[];
}
@InterfaceType()
export abstract class ILesson {
  @Field(() => ISubject)
  subject: ISubject | string;
  @Field(() => IUser)
  coach: IUser | string;
  @Field(() => String)
  student?: IUser | string;
  @Field(() => String)
  date: Date;
  @Field(() => Number)
  time_start: number;
  @Field(() => Number)
  duration: number;
}
