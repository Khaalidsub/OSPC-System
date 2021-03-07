import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IDepartment } from 'departments/types';
import { ISubject } from '../types';

@ObjectType({ implements: ISubject })
export class Subject implements ISubject {
  department: IDepartment;
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  subjectName: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  description: string;
}
