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

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;
  let userModel: Model<UserDocument>;
  afterEach(() => {
    closeInMongodConnection();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '10h' },
        }),
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        UsersResolver,
        UsersService,
        AuthService,
        { provide: getModelToken(User.name), useValue: User },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<UserDocument>>('User');
  });
  describe('register as a student', () => {
    const student = {
      email: 'khaalidsubaan@gmail.com',
      password: 'khaalid123',
      name: 'Khaalid',
      phoneNumber: '01125601863',
      university: 'UTM',
      universityId: '201702M10080',
    } as CreateUserInput;
    it('should return a student', async () => {
      const result = await resolver.registerStudent(student);
      const createdUser = await usersService.create({
        ...student,
        role: Role.student,
        accountStatus: Status.pending,
      });

      expect(result).toBe(createdUser);
    });
    it('should return an error', async () => {
      const result = await resolver.registerStudent(student);
      console.log(result);

      expect(result).toBeInstanceOf(User);
    });
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
