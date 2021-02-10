import { ObjectType } from '@nestjs/graphql';
import { IUser, Role, Status } from '../types';

@ObjectType({ implements: [IUser] })
export class User implements IUser {
  id: string;
  name: string;
  password?: string;
  email: string;
  phoneNumber: string;
  universityId: string;
  university: string;
  role: Role;
  accountStatus: Status;
  coachingStatus: Status;
}
