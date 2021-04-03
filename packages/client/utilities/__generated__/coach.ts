/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role, CoachingStatus, Day } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: coach
// ====================================================

export interface coach_user {
  __typename: "User";
  university: string;
  id: string | null;
  name: string;
  email: string;
  role: Role | null;
  accountStatus: CoachingStatus | null;
  coachingStatus: CoachingStatus | null;
}

export interface coach_getUserSpecialization_specialization {
  __typename: "SubjectDescription";
  title: string;
  description: string;
}

export interface coach_getUserSpecialization_subject {
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

export interface coach_getUserSpecialization {
  __typename: "SubjectSpecialization";
  id: string;
  specialization: coach_getUserSpecialization_specialization[];
  subject: coach_getUserSpecialization_subject;
}

export interface coach_getCoachSchedule_schedule {
  __typename: "Schedule";
  day: Day;
  time_start: number;
  time_end: number;
}

export interface coach_getCoachSchedule {
  __typename: "WeeklySchedule";
  id: string;
  /**
   * Example field (placeholder)
   */
  schedule: coach_getCoachSchedule_schedule[];
}

export interface coach_getBookedLessonsOfTheWeek {
  __typename: "Lesson";
  id: string;
  day: Day;
  date: number;
  time_start: number;
  duration: number;
}

export interface coach {
  user: coach_user;
  getUserSpecialization: coach_getUserSpecialization;
  getCoachSchedule: coach_getCoachSchedule;
  getBookedLessonsOfTheWeek: coach_getBookedLessonsOfTheWeek[];
}

export interface coachVariables {
  id: string;
  dateTo: number;
  dateFrom: number;
}
