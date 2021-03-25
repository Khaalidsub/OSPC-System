/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateWeeklyScheduleInput, CreateSubjecSpecialization, Role, CoachingStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: applyAsCoach
// ====================================================

export interface applyAsCoach_applyCoach {
  __typename: "User";
  id: string | null;
  name: string;
  email: string;
  role: Role | null;
  accountStatus: CoachingStatus | null;
  coachingStatus: CoachingStatus | null;
}

export interface applyAsCoach {
  applyCoach: applyAsCoach_applyCoach;
}

export interface applyAsCoachVariables {
  createWeeklySchedule: CreateWeeklyScheduleInput;
  createSubjectSpecialization: CreateSubjecSpecialization;
}
