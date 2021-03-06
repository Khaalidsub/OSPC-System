import { IUser } from './IUser';
import { ISchedule } from './ISchedule';

export interface IWeeklySchedule {
  coach?: IUser;
  schedule: ISchedule[];
}
