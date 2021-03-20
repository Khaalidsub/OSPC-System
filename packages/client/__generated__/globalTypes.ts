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
}

export enum Role {
  admin = "admin",
  coach = "coach",
  moderator = "moderator",
  student = "student",
}

export interface CreateUserInput {
  name: string;
  university: string;
  password: string;
  email: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
