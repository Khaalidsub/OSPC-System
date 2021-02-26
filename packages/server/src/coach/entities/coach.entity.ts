import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ISubject } from '../../subjects/types';
import { User } from '../../users/entities/user.entity';
import { ISubjectDescription, ISubjectSpecialization } from '../types';

@ObjectType()
export class SubjecSpecialization implements ISubjectSpecialization {
  @Field(() => ID)
  id: string;
  @Field(() => [SubjectDescription])
  specialization: SubjectDescription[];
  @Field(() => ISubject)
  subject: ISubject;
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
