import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsResolver } from './departments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Department } from './entities/department.entity';
import { DepartmentSchema } from './schema/department.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
  ],
  providers: [DepartmentsResolver, DepartmentsService],
})
export class DepartmentsModule {}
