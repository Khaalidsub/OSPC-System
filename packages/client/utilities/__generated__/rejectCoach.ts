/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role, CoachingStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: rejectCoach
// ====================================================

export interface rejectCoach_rejectCoach {
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

export interface rejectCoach {
  rejectCoach: rejectCoach_rejectCoach;
}

export interface rejectCoachVariables {
  id: string;
}
