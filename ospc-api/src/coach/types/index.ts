import { registerEnumType } from '@nestjs/graphql';

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
