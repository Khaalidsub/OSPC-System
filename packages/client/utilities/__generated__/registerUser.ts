/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput, Role, CoachingStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: registerUser
// ====================================================

export interface registerUser_registerStudent {
  __typename: "User";
  id: string | null;
  name: string;
  email: string;
  university: string;
  phoneNumber: number | null;
  role: Role | null;
  accountStatus: CoachingStatus | null;
  coachingStatus: CoachingStatus | null;
}

export interface registerUser {
  registerStudent: registerUser_registerStudent;
}

export interface registerUserVariables {
  createUserInput: CreateUserInput;
}
