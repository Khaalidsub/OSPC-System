import { JwtModule } from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../util/mongo';
import { AuthService } from '../auth/auth.service';
import { jwtConstants } from '../auth/constants';
import { CreateUserInput } from './dto/create-user.input';
import { User, UserDocument, UserSchema } from './schemas/user.schema';
import { Role, Status } from './types';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import {
  emailError,
  invalidEmailError,
  invalidPasswordError,
} from '../util/exceptions';
import { UpdateUserInput } from './dto/update-user.input';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  const student = {
    email: 'khaalidsubaan@gmail.com',
    password: 'khaalid123',
    name: 'Khaalid',
    phoneNumber: '01125601863',
    university: 'UTM',
    universityId: '201702M10080',
  } as CreateUserInput;
  const student2 = {
    email: 'khaalidsubaan',
    password: 'khaalid123',
    name: 'Khaalid',
    phoneNumber: '01125601863',
    university: 'UTM',
    universityId: '201702M10080',
  } as CreateUserInput;
  const student3 = {
    email: 'khaalid@gmail.com',
    password: 'khaa',
    name: 'Khaalid',
    phoneNumber: '01125601863',
    university: 'UTM',
    universityId: '201702M10080',
  } as CreateUserInput;

  afterAll(() => {
    closeInMongodConnection();
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '10h' },
        }),
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UsersResolver, UsersService, AuthService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });
  describe('register as a student', () => {
    it('should return a student', async () => {
      const result = await resolver.registerStudent(student);

      expect(result).toBeTruthy();
    });
    it('should throw an error when email already registered', async () => {
      try {
        await resolver.registerStudent(student);
      } catch (error) {
        expect(error.message).toBe(`Error: ${emailError}`);
      }
    });
    it('should throw an error when invalid email address', async () => {
      try {
        await resolver.registerStudent(student2);
      } catch (error) {
        expect(error.message).toBe(`Error: ${invalidEmailError}`);
      }
    });
    it('should throw an error when invalid password', async () => {
      try {
        await resolver.registerStudent(student3);
      } catch (error) {
        expect(error.message).toBe(`Error: ${invalidPasswordError}`);
      }
    });
  });

  describe('approve student', () => {
    it('should return approved student', async () => {
      const students = await resolver.findAll();
      const student = students.find(
        (student) => student.accountStatus === Status.pending,
      );
      const result = await resolver.approveStudent(student.id);
      student.accountStatus = Status.active;

      expect(result).toHaveProperty('accountStatus', Status.active);
    });
  });
  describe('update user', () => {
    it('should return an updated user', async () => {
      const students = await resolver.findAll();
      const student = students.find(
        (student) => student.accountStatus === Status.active,
      );
      const result = await resolver.updateUser({
        ...student,
        id: student.id,
        name: 'abdi',
      } as UpdateUserInput);

      expect(result).toHaveProperty('name', 'abdi');
    });
  });
  // describe('get one user', () => {
  //   it('should return approved student', async () => {
  //     const students = await resolver.findAll();
  //     const student = students.find(
  //       (student) => student.accountStatus === Status.pending,
  //     );
  //     const result = await resolver.approveStudent(student.id);
  //     student.accountStatus = Status.active;

  //     expect(result).toHaveProperty('accountStatus', Status.active);
  //   });
  // });
});
