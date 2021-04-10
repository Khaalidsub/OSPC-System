/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myLessons
// ====================================================

export interface myLessons_myLessons_subject {
  __typename: "Subject";
  /**
   * Example field (placeholder)
   */
  name: string;
}

export interface myLessons_myLessons_coach {
  __typename: "User";
  name: string;
}

export interface myLessons_myLessons {
  __typename: "Lesson";
  subject: myLessons_myLessons_subject;
  coach: myLessons_myLessons_coach;
  date: number;
  id: string;
}

export interface myLessons {
  myLessons: myLessons_myLessons[];
}

export interface myLessonsVariables {
  limit?: number | null;
}
