import { IUser } from './IUser';

export class IAnswer {
  id: string;
  question: string;
  input: string;
  votes: number;
  isApproved: boolean;
  user: string;
}
