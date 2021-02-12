import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class ISubject {
  @Field(() => String)
  subjectName: string;
  @Field(() => String)
  description: string;
}
