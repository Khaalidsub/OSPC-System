/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CoachingStatus {
  active = "active",
  inactive = "inactive",
  pending = "pending",
  rejected = "rejected",
}

export enum Day {
  friday = "friday",
  monday = "monday",
  saturday = "saturday",
  sunday = "sunday",
  thursday = "thursday",
  tuesday = "tuesday",
  type = "type",
  wednesday = "wednesday",
}

export enum Role {
  admin = "admin",
  coach = "coach",
  moderator = "moderator",
  student = "student",
}

export interface CreateDepartmentInput {
  name: string;
  description: string;
  moderator: string;
}

export interface CreateSubjecSpecialization {
  specialization: CreateSubjectDescription[];
  subject: string;
}

export interface CreateSubjectDescription {
  title: string;
  description: string;
}

export interface CreateSubjectInput {
  name: string;
  description: string;
  department: string;
}

export interface CreateUserInput {
  name: string;
  university: string;
  password: string;
  email: string;
}

export interface CreateWeeklyScheduleInput {
  schedule: ScheduleInputType[];
}

export interface DepartmentInputType {
  id: string;
  name: string;
  description: string;
  moderator: UserInputType;
  subjects: number;
  subjectFields: SubjectInputType[];
}

export interface ScheduleInputType {
  day: Day;
  time_start: number;
  time_end: number;
}

export interface SubjectInputType {
  id: string;
  department: DepartmentInputType;
  name: string;
  description: string;
  coaches: number;
}

export interface UpdateDepartmentInput {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  moderator?: UserInputType | null;
  subjects?: number | null;
  subjectFields?: SubjectInputType[] | null;
}

export interface UpdateSubjectInput {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  coaches?: number | null;
}

export interface UserInputType {
  id?: string | null;
  name: string;
  email: string;
  phoneNumber?: string | null;
  universityId?: string | null;
  university: string;
  role?: Role | null;
  accountStatus?: CoachingStatus | null;
  coachingStatus?: CoachingStatus | null;
  moderatorStatus: CoachingStatus;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
