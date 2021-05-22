import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'auth/auth.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersStudentResolver } from './users.student.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],

  providers: [UsersResolver,UsersStudentResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
