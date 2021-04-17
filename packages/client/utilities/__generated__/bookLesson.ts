/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateLessonInput, Day } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: bookLesson
// ====================================================

export interface bookLesson_bookLesson {
  __typename: "Lesson";
  id: string;
  day: Day;
  date: number;
  time_start: number;
  duration: number;
}

export interface bookLesson {
  bookLesson: bookLesson_bookLesson;
}

export interface bookLessonVariables {
  createLesson: CreateLessonInput;
}
