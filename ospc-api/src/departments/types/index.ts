import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { IUser } from '../../users/types';
import { Department } from '../entities/department.entity';

@InterfaceType()
export abstract class IDepartment {
  @Field(() => String)
  departmentName: string;
  @Field(() => String)
  departmentDescription: string;
  @Field(() => IUser, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  departmentModerator?: IUser;
}

@InterfaceType()
export abstract class IDepartmentModeratorApplication {
  @Field(() => String)
  description: string;
  @Field(() => Department || String)
  department: IDepartment | string;
  @Field(() => [String])
  resumeLinks: string[];
  @Field(() => IUser || String, {})
  user: IUser | string;
}
