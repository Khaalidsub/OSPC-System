/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateWeeklySchedule } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateSchedule
// ====================================================

export interface updateSchedule_updateWeeklySchedule {
  __typename: "WeeklySchedule";
  id: string;
}

export interface updateSchedule {
  updateWeeklySchedule: updateSchedule_updateWeeklySchedule;
}

export interface updateScheduleVariables {
  updateSchedule: UpdateWeeklySchedule;
  id: string;
}
