import { ISubject } from './ISubject';
import { ISubjectDescription } from './ISubjectDescription';
import { IUser } from './IUser';

export interface ISubjectSpecialization {
  specialization: ISubjectDescription[];
  subject: string;
  coach: string;
}
