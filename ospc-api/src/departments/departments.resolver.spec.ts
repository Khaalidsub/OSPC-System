import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsResolver } from './departments.resolver';
import { DepartmentsService } from './departments.service';
import { Department } from './schema/department.schema';

describe('DepartmentsResolver', () => {
  let resolver: DepartmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsResolver,
        DepartmentsService,
        { provide: getModelToken(Department.name), useValue: Department },
      ],
    }).compile();

    resolver = module.get<DepartmentsResolver>(DepartmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
