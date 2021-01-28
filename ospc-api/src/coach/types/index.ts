import { registerEnumType } from '@nestjs/graphql';

import { Subject } from 'src/subjects/entities/subject.entity';
import { IUser } from 'src/users/types';

export type Specialization = {
  title: string;
  description: string;
};

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

export interface ISubjectDescription {
  description: string;
  title: string;
}
export interface ISubjectSpecialization {}
export interface ISchedule {
  day: Days;
  time_start: number;
  time_end: number;
}

export interface IWeeklySchedule {
  coach: IUser;
  schedule: ISchedule[];
}
export interface ILesson {
  subject: Subject;
  coach: IUser;
  student: IUser;
  date: Date;
  time_start: number;
  duration: number;
}
