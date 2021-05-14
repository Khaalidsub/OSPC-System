/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role, CoachingStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: approveStudent
// ====================================================

export interface approveStudent_approveStudent {
  __typename: "User";
  id: string | null;
  name: string;
  email: string;
  university: string;
  phoneNumber: number | null;
  role: Role | null;
  image: string;
  accountStatus: CoachingStatus | null;
  coachingStatus: CoachingStatus | null;
}

export interface approveStudent {
  approveStudent: approveStudent_approveStudent;
}

export interface approveStudentVariables {
  id: string;
}
