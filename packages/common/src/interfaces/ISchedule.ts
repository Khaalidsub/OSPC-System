import { Days } from '../enums';

export interface ISchedule {
  day: Days;
  time_start: number;
  time_end: number;
}
