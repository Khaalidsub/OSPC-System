import { InputType, Field, InterfaceType } from '@nestjs/graphql';
import { ISubject } from '../../subjects/types';
import { User } from '../../users/entities/user.entity';
import { IUser } from '../../users/types';

@InterfaceType()
@InputType('IQuestionType')
export class IQuestion {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String)
  question: string;
  @Field(() => ISubject)
  subject: ISubject;
  @Field(() => IUser, { nullable: true })
  user: IUser;
}
