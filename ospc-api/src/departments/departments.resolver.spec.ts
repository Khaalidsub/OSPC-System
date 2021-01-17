import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { departmentNameError } from '../util/exceptions';
import { closeInMongodConnection, rootMongooseTestModule } from '../util/mongo';
import { DepartmentsResolver } from './departments.resolver';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { Department, DepartmentSchema } from './schema/department.schema';

describe('DepartmentsResolver', () => {
  let resolver: DepartmentsResolver;

  const department = {
    departmentName: 'Computer Science',
    departmentDescription:
      'the department for all the computer studies such as data science,software engineering and more',
  } as CreateDepartmentInput;
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
      ],
      providers: [DepartmentsResolver, DepartmentsService],
    }).compile();

    resolver = module.get<DepartmentsResolver>(DepartmentsResolver);
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
      department.departmentDescription = 'the description has been changed';

      const response = await resolver.updateDepartment(department);
      expect(response).toHaveProperty(
        'departmentDescription',
        'the description has been changed',
      );
    });
  });

  describe('assign department moderator', () => {});

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
