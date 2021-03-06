import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubjecSpecialization {
  @Field(() => [CreateSubjectDescription])
  specialization: CreateSubjectDescription[];
  @Field(() => String)
  subject: string;
}

@InputType()
export class CreateSubjectDescription {
  @Field(() => String)
  title: string;
  @Field(() => String)
  description: string;
}
