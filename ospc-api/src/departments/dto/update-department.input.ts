import { CreateDepartmentInput } from './create-department.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => ID)
  id: string;
  @Field(() => User, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  departmentModerator?: User;
}
