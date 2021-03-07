import { InputType, Field, PartialType, ID, OmitType } from '@nestjs/graphql';
import { Department } from 'departments/entities/department.entity';

@InputType()
export class UpdateDepartmentInput extends PartialType(Department, InputType) {}
