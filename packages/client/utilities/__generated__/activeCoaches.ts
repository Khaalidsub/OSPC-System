/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role, CoachingStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: activeCoaches
// ====================================================

export interface activeCoaches_activeCoaches {
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

export interface activeCoaches {
  activeCoaches: activeCoaches_activeCoaches[];
}

export interface activeCoachesVariables {
  id?: string | null;
}
