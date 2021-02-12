import { InputType, Field } from '@nestjs/graphql';
import { ISubjectDescription, ISubjectSpecialization } from '../types';
import { ISubject } from 'src/subjects/types';

@InputType()
export class CreateSubjecSpecialization implements ISubjectSpecialization {
  @Field(() => [CreateSubjectDescription])
  specialization: CreateSubjectDescription[];
  @Field(() => ISubject, { nullable: false })
  subject: ISubject;
  @Field(() => String)
  coach?: string;
}

@InputType()
export class CreateSubjectDescription implements ISubjectDescription {
  @Field(() => String)
  title: string;
  @Field(() => String)
  description: string;
}
