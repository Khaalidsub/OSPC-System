import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'users/users.module';

import { join } from 'path';
import { AuthModule } from 'auth/auth.module';
import { DepartmentsModule } from 'departments/departments.module';
import { SubjectsModule } from 'subjects/subjects.module';

import { CoachModule } from 'coach/coach.module';
import { ForumModule } from 'forum/forum.module';
import { autoPopulateAllFields } from 'mongoose-autopopulator';
import { formatError } from 'utils';
import { ChatsModule } from './chats/chats.module';
import { PaymentModule } from './payment/payment.module';
import { PubSub } from 'apollo-server-express';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
const db = process.env.DB ? process.env.DB : 'localhost';
const pubSub = new PubSub();
@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    GraphQLModule.forRoot({
      context: ({ req, connection }) => {
        if (connection?.context) {
          return { req: { headers: connection.context }, pubSub };
        }
        return { req, pubSub };
      },
      installSubscriptionHandlers: true,

      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: formatError,
      include: [
        UsersModule,
        AuthModule,
        DepartmentsModule,
        SubjectsModule,
        ForumModule,
        CoachModule,
        PaymentModule,
        ChatsModule,
      ],
    }),
    MongooseModule.forRoot(`mongodb://${db}/ospc`, {
      useFindAndModify: false,

      connectionFactory: (connection) => {
        // connection.plugin(autoPopulateAllFields);
        return connection;
      },
    }),
    UsersModule,
    AuthModule,
    DepartmentsModule,
    SubjectsModule,
    CoachModule,
    ForumModule,
    ChatsModule,
    PaymentModule,
  ],
})
export class AppModule {}
