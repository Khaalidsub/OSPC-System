import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { IDepartment } from '../types';

@ObjectType({ implements: IDepartment })
export class Department implements IDepartment {
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: string;
  departmentName: string;
  departmentDescription: string;
  departmentModerator?: User;
}
