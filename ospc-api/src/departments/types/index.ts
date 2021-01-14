import { IUser } from 'src/users/types';

export interface IDepartment {
  departmentName: string;
  departmentDescription: string;
  departmentModerator: IUser;
}
