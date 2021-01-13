import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

import { UserSchema, User } from './schemas/user.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],

  providers: [
    UsersResolver,
    UsersService,
    {
      provide: getModelToken(User.name),
      useValue: User,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
