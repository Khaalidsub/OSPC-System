import { InputType, Field } from '@nestjs/graphql';
import { IUser } from 'src/users/types';
import { User } from '../../users/entities/user.entity';
import { Department } from '../entities/department.entity';
import { IDepartment, IDepartmentModeratorApplication } from '../types';

@InputType()
export class CreateDepartmentModeratorApplication
  implements IDepartmentModeratorApplication {
  @Field(() => String, { description: 'Example field (placeholder)' })
  description: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  department: string;
  @Field(() => [String], { description: 'Example field (placeholder)' })
  resumeLinks: string[];
  @Field(() => String, {
    description: 'Example field (placeholder)',
  })
  user: string;
}
