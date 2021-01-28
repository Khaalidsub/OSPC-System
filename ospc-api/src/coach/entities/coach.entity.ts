import { ObjectType, Field } from '@nestjs/graphql';
import { Subject } from '../../subjects/entities/subject.entity';
import { User } from '../../users/entities/user.entity';
import { ISubjectDescription, ISubjectSpecialization } from '../types';

@ObjectType()
export class SubjecSpecialization implements ISubjectSpecialization {
  @Field(() => [SubjectDescription])
  specialization: SubjectDescription[];
  @Field(() => Subject)
  subject: Subject;
  @Field(() => User)
  coach: User;
}

@ObjectType()
export class SubjectDescription implements ISubjectDescription {
  @Field(() => String)
  title: string;
  @Field(() => String)
  description: string;
}
