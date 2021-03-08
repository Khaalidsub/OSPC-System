import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from 'users/users.resolver';
import { CreateUserInput } from 'users/dto/create-user.input';
import { UsersModule } from 'users/users.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../utils/mongo';
import { DepartmentsResolver } from './departments.resolver';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { Department, DepartmentSchema } from './entities/department.entity';
import { departmentNameError } from '@common/utils';

describe('DepartmentsResolver', () => {
  let resolver: DepartmentsResolver;
  let userResolver: UsersResolver;
  const department = {
    name: 'Computer Science',
    description:
      'the department for all the computer studies such as data science,software engineering and more',
  } as CreateDepartmentInput;

  const student = {
    email: 'khaalidsubaan@gmail.com',
    password: 'khaalid123',
    name: 'Khaalid',
    phoneNumber: '01125601863',
    university: 'UTM',
    universityId: '201702M10080',
  } as CreateUserInput;

  afterAll(() => {
    closeInMongodConnection();
  });
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Department.name, schema: DepartmentSchema },
        ]),
        UsersModule,
      ],
      providers: [DepartmentsResolver, DepartmentsService],
    }).compile();

    resolver = module.get<DepartmentsResolver>(DepartmentsResolver);
    userResolver = module.get<UsersResolver>(UsersResolver);
  });

  describe('create department', () => {
    it('should return a department', async () => {
      const result = await resolver.createDepartment(department);
      expect(result).toBeTruthy();
    });
    it('should throw error when departmentname already exists', async () => {
      try {
        await resolver.createDepartment(department);
      } catch (error) {
        expect(error.message).toBe(`Error: ${departmentNameError}`);
      }
    });
  });

  describe('update department', () => {
    it('should return updated department', async () => {
      const departments = await resolver.findAll();

      const [department] = departments;
      department.description = 'the description has been changed';

      const response = await resolver.updateDepartment({
        ...department,
        id: department.id,
      } as any);
      expect(response).toHaveProperty(
        'departmentDescription',
        department.description,
      );
    });
  });

  describe('assign department moderator', () => {
    it('should assign department moderator', async () => {
      await userResolver.registerStudent(student);
      const [user] = await userResolver.findAll();
      const [department] = await resolver.findAll();
      const { moderator } = await resolver.assignDepartMentModerator(
        department.id,
        user.id,
      );

      expect(moderator).toBeTruthy();
    });
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
