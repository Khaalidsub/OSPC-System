import { ISubject } from './ISubject';
import { IUser } from './IUser';

export class IQuestion {
  id: string;
  question: string;
  subject: ISubject;
  user: IUser;
}
