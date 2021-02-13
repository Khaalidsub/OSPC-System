import { InputType, Int, Field } from '@nestjs/graphql';
import { ISubject } from '../../subjects/types';

@InputType()
export class CreateQuestionInput {
  @Field(() => String, { description: '' })
  question: string;
  @Field(() => ISubject)
  subject: ISubject;
}
