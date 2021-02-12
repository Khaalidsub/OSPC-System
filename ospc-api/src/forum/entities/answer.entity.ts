import { InputType, ObjectType } from '@nestjs/graphql';
import { IUser } from '../../users/types';
import { IAnswer } from '../types';

@ObjectType({ implements: IAnswer })
export class Answer implements IAnswer {
  id: string;
  input: string;
  votes: number;
  user: IUser;
}
