/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role, CoachingStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_loginUser_user {
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

export interface login_loginUser {
  __typename: "AuthResult";
  token: string;
  user: login_loginUser_user;
}

export interface login {
  loginUser: login_loginUser;
}

export interface loginVariables {
  email: string;
  password: string;
}
