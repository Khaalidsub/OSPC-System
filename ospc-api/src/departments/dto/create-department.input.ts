import { InputType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { IDepartment } from '../types';

@InputType()
export class CreateDepartmentInput implements IDepartment {
  @Field(() => String, { description: 'Example field (placeholder)' })
  departmentName: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  departmentDescription: string;
  @Field(() => User, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  departmentModerator?: User;
  // @Field(() => String, { description: 'Example field (placeholder)' })
  // departmentModerator: string;
}
