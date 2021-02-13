import { InputType, Field } from '@nestjs/graphql';
import { ISubjectDescription, ISubjectSpecialization } from '../types';
import { ISubject } from '../../subjects/types';

@InputType()
export class CreateSubjecSpecialization {
  @Field(() => [CreateSubjectDescription])
  specialization: CreateSubjectDescription[];
  @Field(() => String, { nullable: false })
  subject: string;
}

@InputType()
export class CreateSubjectDescription {
  @Field(() => String)
  title: string;
  @Field(() => String)
  description: string;
}
