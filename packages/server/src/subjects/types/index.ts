import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { Department } from '../../departments/entities/department.entity';
import { IDepartment } from '../../departments/types';

@InterfaceType()
@InputType('SubjectType')
export abstract class ISubject {
  @Field(() => String)
  id?: string;
  @Field(() => String)
  subjectName: string;
  @Field(() => String)
  description: string;

  @Field(() => Department)
  department: IDepartment;
}
