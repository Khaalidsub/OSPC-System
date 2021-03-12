import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsResolver } from './departments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './entities/department.entity';
import { UsersModule } from 'users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
    UsersModule,
  ],
  providers: [DepartmentsResolver, DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
