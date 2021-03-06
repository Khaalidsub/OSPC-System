import { IQuestion } from './IQuestion';
import { IUser } from './IUser';

export class IAnswer {
  id: string;
  question: IQuestion;
  input: string;
  votes: number;
  isApproved: boolean;
  user: IUser;
}
