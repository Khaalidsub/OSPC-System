import { Days } from '../enums';
import { ISubject } from './ISubject';
import { IUser } from './IUser';

export type DaySchedule = {
  day: Days;
  time_start: number;
  time_end: number;
};

export interface ILesson {
  subject: string;
  coach: string;
  student: string;
}
