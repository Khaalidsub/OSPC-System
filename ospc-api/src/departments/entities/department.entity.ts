import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { IDepartment } from '../types';

@ObjectType()
export class Department implements IDepartment {
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  departmentName: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  departmentDescription: string;
  @Field(() => User, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  departmentModerator: User;
}
