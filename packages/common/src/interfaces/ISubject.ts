import { IDepartment } from './IDepartment';

export interface ISubject {
  id: string;
  subjectName: string;
  description: string;
  department: IDepartment;
}
