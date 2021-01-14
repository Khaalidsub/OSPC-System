import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { AdminGuard } from 'src/auth/guards/graph-admin.auth.guard';
import { GqlAuthGuard } from 'src/auth/guards/graph-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard, AdminGuard)
  createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentsService.create(createDepartmentInput);
  }

  @Query(() => [Department], { name: 'departments' })
  @UseGuards(GqlAuthGuard, AdminGuard)
  findAll() {
    return this.departmentsService.findAll();
  }

  @Query(() => Department, { name: 'department' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.departmentsService.findOne(id);
  }

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard, AdminGuard)
  updateDepartment(
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    return this.departmentsService.update(
      updateDepartmentInput.id,
      updateDepartmentInput,
    );
  }

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard, AdminGuard)
  removeDepartment(@Args('id', { type: () => String }) id: string) {
    return this.departmentsService.remove(id);
  }
}
