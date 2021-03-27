/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Day } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: coachSchedule
// ====================================================

export interface coachSchedule_getUserSpecialization_specialization {
  __typename: "SubjectDescription";
  title: string;
}

export interface coachSchedule_getUserSpecialization_subject {
  __typename: "Subject";
  /**
   * Example field (placeholder)
   */
  id: string;
  /**
   * Example field (placeholder)
   */
  name: string;
}

export interface coachSchedule_getUserSpecialization {
  __typename: "SubjectSpecialization";
  id: string;
  specialization: coachSchedule_getUserSpecialization_specialization[];
  subject: coachSchedule_getUserSpecialization_subject;
}

export interface coachSchedule_getCoachSchedule_schedule {
  __typename: "Schedule";
  day: Day;
  time_start: number;
  time_end: number;
}

export interface coachSchedule_getCoachSchedule {
  __typename: "WeeklySchedule";
  id: string;
  /**
   * Example field (placeholder)
   */
  schedule: coachSchedule_getCoachSchedule_schedule[];
}

export interface coachSchedule {
  getUserSpecialization: coachSchedule_getUserSpecialization;
  getCoachSchedule: coachSchedule_getCoachSchedule;
}

export interface coachScheduleVariables {
  id: string;
}
