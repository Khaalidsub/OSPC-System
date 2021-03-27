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

export interface CreateSubjecSpecialization {
  specialization: CreateSubjectDescription[];
  subject: string;
}

export interface CreateSubjectDescription {
  title: string;
  description: string;
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

export interface ScheduleInputType {
  day: Day;
  time_start: number;
  time_end: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
