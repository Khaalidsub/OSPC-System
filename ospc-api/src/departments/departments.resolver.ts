import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { AdminGuard } from '../auth/guards/graph-admin.auth.guard';
import { GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { HttpException, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { invalid } from '../util/exceptions';

@Resolver(() => Department)
export class DepartmentsResolver {
  private readonly logger = new Logger(DepartmentsResolver.name);
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard, AdminGuard)
  createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    try {
      return this.departmentsService.create(createDepartmentInput);
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }

  @Query(() => [Department], { name: 'departments' })
  @UseGuards(GqlAuthGuard, AdminGuard)
  findAll() {
    try {
      return this.departmentsService.findAll();
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }

  @Query(() => Department, { name: 'department' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return this.departmentsService.findOne(id);
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard, AdminGuard)
  updateDepartment(
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    try {
      return this.departmentsService.update(
        updateDepartmentInput.id,
        updateDepartmentInput,
      );
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard, AdminGuard)
  removeDepartment(@Args('id', { type: () => String }) id: string) {
    try {
      return this.departmentsService.remove(id);
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }
}
