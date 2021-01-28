import { InputType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { ISubjectDescription, ISubjectSpecialization } from '../types';

@InputType()
export class CreateSubjecSpecialization implements ISubjectSpecialization {
  @Field(() => [CreateSubjectDescription])
  specialization: CreateSubjectDescription[];
  @Field(() => Subject)
  subject: Subject;
  @Field(() => User)
  coach: User;
}

@InputType()
export class CreateSubjectDescription implements ISubjectDescription {
  @Field(() => String)
  title: string;
  @Field(() => String)
  description: string;
}
