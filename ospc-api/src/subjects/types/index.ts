import { Field, InputType, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
@InputType('ScheduleType')
export abstract class ISubject {
  @Field(() => String)
  subjectName: string;
  @Field(() => String)
  description: string;
}
