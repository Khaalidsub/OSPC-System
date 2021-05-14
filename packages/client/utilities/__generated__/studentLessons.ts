/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: studentLessons
// ====================================================

export interface studentLessons_studentLessons {
  __typename: "StudentLessons";
  id: string;
  name: string;
  image: string | null;
  email: string;
  lessons_given: number;
}

export interface studentLessons {
  studentLessons: studentLessons_studentLessons[];
}
