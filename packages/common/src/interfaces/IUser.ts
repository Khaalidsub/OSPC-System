import { Role, Status } from 'enums';

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
