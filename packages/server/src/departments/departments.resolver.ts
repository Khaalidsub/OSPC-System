import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { AdminGuard } from 'auth/guards/graph-admin.auth.guard';
import { CurrentUser, GqlAuthGuard } from 'auth/guards/graph-auth.guard';
import {
  HttpException,
  HttpStatus,
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { User } from 'users/entities/user.entity';
import { CreateDepartmentModeratorApplication } from './dto/create-moderator.input';
import { CreateUserInput } from 'users/dto/create-user.input';
import { SentryInterceptor } from '../Sentry';
import { Role, Status } from '@common/enums';
import {
  departmentNameError,
  emailError,
  invalid,
  invalidEmailError,
  invalidPasswordError,
  REG_EMAIL,
} from '@common/utils';
import { SubjectsService } from 'subjects/subjects.service';
import { Subject } from 'subjects/entities/subject.entity';
import { ModeratorGuard } from 'auth/guards/graph-moderator.auth.guard';
@UseInterceptors(SentryInterceptor)
@Resolver(() => Department)
export class DepartmentsResolver {
  private readonly logger = new Logger(DepartmentsResolver.name);
  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly usersService: UsersService,
    private readonly subjectsService: SubjectsService,
  ) {}

  @Mutation(() => Department)
  // @UseGuards(GqlAuthGuard, AdminGuard)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    try {
      // await this.validate(createDepartmentInput);
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
      return this.usersService.update(user.id, {
        moderatorStatus: Status.pending,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  @Mutation(() => User)
  // @UseGuards(GqlAuthGuard, AdminGuard)
  async addModerator(
    // @CurrentUser() user: User,
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
      } as User);
    } catch (error) {
      throw new Error(error);
    }
  }
  @Query(() => [User], { name: 'availableModerators' })
  async getAvailableModerators() {
    try {
      // get all moderator ids from departments
      const users = (await this.departmentsService.findModerators()).map(
        (dep) => dep.moderator,
      );
      // filter the user place with those ids
      // console.log(users);

      return this.usersService.findAvailableModerators(users);
    } catch (error) {
      throw new Error(error);
    }
  }
  @Query(() => [Subject], { name: 'subjectsByModerator' })
  @UseGuards(GqlAuthGuard, ModeratorGuard)
  async getSubjectsByDepartment(@CurrentUser() user: User) {
    try {
      const department = await this.departmentsService.findOne({
        moderator: user.id,
      });
      return this.subjectsService.findByQuery({ department: department.id });
    } catch (error) {
      throw new Error(error);
    }
  }
  @Query(() => Department, { name: 'departmentByModerator' })
  @UseGuards(GqlAuthGuard, ModeratorGuard)
  async getDepartmentByModerator(@CurrentUser() user: User) {
    try {
      return this.departmentsService.findOne({
        moderator: user.id,
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

  @Query(() => [Department], { name: 'departments' })
  // @UseGuards(GqlAuthGuard, AdminGuard)
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
      return this.departmentsService.findById(id);
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }
  @Mutation(() => Department)
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
    @Args('id') id: string,
    @Args('updateDepartmentInput')
    updateDepartmentInput: UpdateDepartmentInput,
  ) {
    try {
      const result = await this.departmentsService.update(
        id,
        updateDepartmentInput,
      );

      return result;
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }
  @ResolveField()
  moderator(@Parent() department: Department) {
    return this.usersService.findById(department.moderator);
  }

  @ResolveField()
  subjects(@Parent() department: Department) {
    return this.subjectsService.subjectCount(department.id);
  }

  @ResolveField(() => [Subject], { defaultValue: [] })
  async subjectFields(@Parent() department: Department) {
    const result = await this.departmentsService.subjects(department.id);
    console.log(result[0], result[0].subjects);

    return result[0].subjects;
  }
}
