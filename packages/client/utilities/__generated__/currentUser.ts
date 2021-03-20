/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role, CoachingStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: currentUser
// ====================================================

export interface currentUser_currentUser {
  __typename: "User";
  id: string | null;
  name: string;
  email: string;
  role: Role | null;
  accountStatus: CoachingStatus | null;
  coachingStatus: CoachingStatus | null;
}

export interface currentUser {
  currentUser: currentUser_currentUser;
}
