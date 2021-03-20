export interface IDepartment {
  id: string;
  name: string;
  description: string;
  moderator: string;
}

export interface IDepartmentModeratorApplication {
  description: string;
  department: string;
}
