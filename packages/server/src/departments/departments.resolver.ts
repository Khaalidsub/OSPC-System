import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { AdminGuard } from '../auth/guards/graph-admin.auth.guard';
import { CurrentUser, GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import {
  HttpException,
  HttpStatus,
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  departmentNameError,
  emailError,
  invalid,
  invalidEmailError,
  invalidPasswordError,
} from '../utils/exceptions';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateDepartmentModeratorApplication } from './dto/create-moderator.input';
import { CreateUserInput } from '../users/dto/create-user.input';
import { REG_EMAIL } from '../utils/checkers';
import { IDepartment } from './types';
import { Role, Status } from '../users/types';
import { SentryInterceptor } from '../Sentry';
@UseInterceptors(SentryInterceptor)
@Resolver(() => Department)
export class DepartmentsResolver {
  private readonly logger = new Logger(DepartmentsResolver.name);
  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard, AdminGuard)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    try {
      await this.validate(createDepartmentInput);
      return (
        await this.departmentsService.create(createDepartmentInput)
      ).execPopulate();
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
      return this.usersService.update(user.id, {
        moderatorStatus: Status.pending,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, AdminGuard)
  async addModerator(
    @CurrentUser() user: User,
    @Args('createDepartmentModerator')
    createUserInput: CreateUserInput,
  ) {
    try {
      await this.validateUser(createUserInput);
      return await this.usersService.create({
        ...createUserInput,
        moderatorStatus: Status.active,
        role: Role.moderator,
        accountStatus: Status.active,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateUser(user: CreateUserInput) {
    const findUser = await this.usersService.findOne({ email: user.email });

    if (findUser) {
      throw new HttpException(emailError, HttpStatus.BAD_REQUEST);
    }
    if (!REG_EMAIL.test(user.email)) {
      throw new HttpException(invalidEmailError, HttpStatus.BAD_REQUEST);
    }
    if (user.password.length < 6) {
      throw new HttpException(invalidPasswordError, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, AdminGuard)
  async approveDepartmentModerator(@Args('id') id: string) {
    try {
      return this.usersService.update(id, {
        moderatorStatus: Status.active,
        role: Role.moderator,
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
  @Mutation(() => IDepartment)
  @UseGuards(GqlAuthGuard, AdminGuard)
  async assignDepartMentModerator(
    @Args('id', { type: () => String }) departmentId: string,
    @Args('userId', { type: () => String }) userId: string,
  ) {
    try {
      const updatedUser = await this.usersService.update(userId, {
        moderatorStatus: Status.active,
        accountStatus: Status.active,
        role: Role.moderator,
      });

      const updatedDepartment = await this.departmentsService.update(
        departmentId,
        {
          departmentModerator: updatedUser.id,
        },
      );

      return updatedDepartment;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard, AdminGuard)
  async updateDepartment(
    @Args('updateDepartmentInput')
    updateDepartmentInput: UpdateDepartmentInput,
  ) {
    try {
      const result = await this.departmentsService.update(
        updateDepartmentInput.id,
        updateDepartmentInput,
      );

      return result;
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }
}
