import { IUser } from './IUser';

export interface IDepartment {
  id: string;
  departmentName: string;
  departmentDescription: string;
  departmentModerator: IUser;
}

export interface IDepartmentModeratorApplication {
  description: string;
  department: IDepartment | string;
}
