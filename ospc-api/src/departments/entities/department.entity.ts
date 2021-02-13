import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { IDepartment } from '../types';

@ObjectType({ implements: IDepartment })
@InputType('DepartmentType')
export class Department implements IDepartment {
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: string;
  departmentName: string;
  departmentDescription: string;
  departmentModerator: User;
}
