import { CreateDepartmentInput } from './create-department.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => ID)
  id: string;
}
