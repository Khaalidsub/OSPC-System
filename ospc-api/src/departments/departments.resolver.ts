import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { AdminGuard } from '../auth/guards/graph-admin.auth.guard';
import { CurrentUser, GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { HttpException, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { departmentNameError, invalid } from '../util/exceptions';
import { UsersService } from 'src/users/users.service';
import { UpdateUserInput } from 'src/users/dto/update-user.input';
import { Status } from 'src/users/types';
import { User } from 'src/users/entities/user.entity';
import { CreateDepartmentModeratorApplication } from './dto/create-moderator.input';

@Resolver(() => Department)
export class DepartmentsResolver {
  private readonly logger = new Logger(DepartmentsResolver.name);
  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly users: UsersService,
  ) {}

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
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async applyModerator(
    @CurrentUser() user: User,
    @Args('createDepartmentModeratorApplication')
    application: CreateDepartmentModeratorApplication,
  ) {
    try {
      return this.users.update(user.id, {
        moderatorStatus: Status.pending,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, AdminGuard)
  async approveDepartmentModerator(@Args('id') id: string) {
    try {
      return this.users.update(id, {
        moderatorStatus: Status.active,
      });
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
    @Args('updateDepartmentInput')
    updateDepartmentInput: UpdateDepartmentInput | any,
  ) {
    try {
      await this.departmentsService.update(
        updateDepartmentInput.id,
        updateDepartmentInput,
      );

      return this.departmentsService.findById(updateDepartmentInput.id);
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }
}
