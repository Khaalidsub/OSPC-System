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
import { formatError } from 'utils';
import { ChatsModule } from './chats/chats.module';
import { PaymentModule } from './payment/payment.module';
import { PubSub } from 'apollo-server-express';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ApolloServerPluginUsageReporting } from 'apollo-server-core';
const db = process.env.DB_HOST;
const pubSub = new PubSub();
@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    GraphQLModule.forRoot({
      cors: false,

      context: ({ req, connection }) => {
        if (connection?.context) {
          return { req: { headers: connection.context }, pubSub };
        }
        return { req, pubSub };
      },
      installSubscriptionHandlers: true,
      tracing: true,

      engine: {
        apiKey: process.env.APOLLO_KEY,

        reportSchema: true,
        graphVariant: process.env.APOLLO_GRAPH_VARIANT,
      },
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

    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST || 'localhost'}/ospc`,
      {
        useFindAndModify: false,
        dbName: process.env.DB_NAME,
        connectionFactory: (connection) => {
          // connection.plugin(autoPopulateAllFields);
          return connection;
        },
      },
    ),
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