import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  student = 'STUDENT',
  coach = 'COACH',
  admin = 'ADMIN',
  moderator = 'MODERATOR',
}
export enum Status {
  active = 'ACTIVE',
  pending = 'PENDING',
  inactive = 'INACTIVE',
}

export interface IUser {
  id?: string;
  name: string;
  password?: string;
  email: string;
  phoneNumber: string;
  universityId: string;
  university: string;
  role?: Role;
  accountStatus?: Status;
  coachingStatus?: Status;
  moderatorStatus?: Status;
}

registerEnumType(Role, { name: 'Role' });
registerEnumType(Status, { name: 'Status' });
registerEnumType(Status, { name: 'CoachingStatus' });
