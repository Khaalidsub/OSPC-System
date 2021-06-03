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
import { BullModule } from '@nestjs/bull';
// import { StripeModule,  } from '@golevelup/nestjs-stripe';
const pubSub = new PubSub();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis:{
        host:process.env.REDIS_HOST,
        port:Number.parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD
      },
    }),
    // StripeModule.forRoot(StripeModule, {
    //   apiKey: process.env.STRIPE_SECRET,
    //   // webhookConfig: {
    //   //   stripeWebhookSecret: 'abc',
    //   // },
    // }),
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
      // tracing: true,

      engine: {
        apiKey: process.env.APOLLO_KEY,

        reportSchema:process.env.NODE_ENV !== 'production',
        graphVariant: process.env.APOLLO_GRAPH_VARIANT,
        
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // formatError: formatError,
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
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
      {
        useFindAndModify: false,
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-paginate-v2'));
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
  exports:[]
})
export class AppModule {}
