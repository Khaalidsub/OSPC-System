import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { AdminGuard } from '../auth/guards/graph-admin.auth.guard';
import { GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { HttpException, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { departmentNameError, invalid } from '../util/exceptions';

@Resolver(() => Department)
export class DepartmentsResolver {
  private readonly logger = new Logger(DepartmentsResolver.name);
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard, AdminGuard)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    try {
      await this.validate(createDepartmentInput);
      return this.departmentsService.create(createDepartmentInput);
    } catch (error) {
      throw new Error(error);
    }
  }

  async validate(createDepartmentInput: CreateDepartmentInput) {
    const result = await this.departmentsService.findOne({
      departmentName: createDepartmentInput.departmentName,
    });
    if (result) {
      throw new HttpException(departmentNameError, HttpStatus.BAD_REQUEST);
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
  async updateDepartment(
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    try {
      const result = await this.departmentsService.update(
        updateDepartmentInput.id,
        updateDepartmentInput,
      );
      this.logger.error(result);
      return result;
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }
}
