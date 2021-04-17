/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Day } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: schedule
// ====================================================

export interface schedule_getSchedule_schedule {
  __typename: "Schedule";
  day: Day;
  time_start: number;
  time_end: number;
}

export interface schedule_getSchedule {
  __typename: "WeeklySchedule";
  id: string;
  timeZone: string | null;
  /**
   * Example field (placeholder)
   */
  schedule: schedule_getSchedule_schedule[];
}

export interface schedule {
  getSchedule: schedule_getSchedule;
}
