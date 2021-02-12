import { InputType, Int, Field } from '@nestjs/graphql';
import { ISubject } from 'src/subjects/types';

@InputType()
export class CreateQuestionInput {
  @Field(() => String, { description: '' })
  question: string;
  @Field(() => ISubject)
  subject: ISubject;
}
