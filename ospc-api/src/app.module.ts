import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { SubjectsModule } from './subjects/subjects.module';

import { CoachModule } from './coach/coach.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [UsersModule, AuthModule, DepartmentsModule, SubjectsModule],
    }),
    MongooseModule.forRoot('mongodb://localhost/ospc', {
      useFindAndModify: false,
    }),
    UsersModule,
    AuthModule,
    DepartmentsModule,
    SubjectsModule,

    CoachModule,
  ],
})
export class AppModule {}
