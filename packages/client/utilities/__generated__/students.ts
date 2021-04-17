/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role, CoachingStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: students
// ====================================================

export interface students_students {
  __typename: "User";
  id: string | null;
  name: string;
  email: string;
  university: string;
  phoneNumber: string | null;
  role: Role | null;
  accountStatus: CoachingStatus | null;
  coachingStatus: CoachingStatus | null;
}

export interface students {
  students: students_students[];
}
