import { InputType, Int, Field } from '@nestjs/graphql';
import { Subject } from 'src/subjects/entities/subject.entity';

@InputType()
export class CreateCoachInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@InputType()
export class CreateSubjecSpecialization {
  @Field(() => [CreateSubjectDescription])
  specialization: CreateSubjectDescription[];
  @Field(() => Subject)
  subject: Subject;
}

@InputType()
export class CreateSubjectDescription {
  @Field(() => String)
  title: string;
  @Field(() => String)
  description: string;
}
