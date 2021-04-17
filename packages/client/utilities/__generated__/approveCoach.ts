/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role, CoachingStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: approveCoach
// ====================================================

export interface approveCoach_approveCoach {
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

export interface approveCoach {
  approveCoach: approveCoach_approveCoach;
}

export interface approveCoachVariables {
  id: string;
}
