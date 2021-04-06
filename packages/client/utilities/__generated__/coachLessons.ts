/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: coachLessons
// ====================================================

export interface coachLessons_coachLessons_subjectSpecialization_specialization {
  __typename: "SubjectDescription";
  title: string;
  description: string;
}

export interface coachLessons_coachLessons_subjectSpecialization {
  __typename: "SubjectSpecialization";
  specialization: coachLessons_coachLessons_subjectSpecialization_specialization[];
}

export interface coachLessons_coachLessons {
  __typename: "CoachLessons";
  id: string;
  name: string;
  email: string;
  lessons_taken: number;
  subjectSpecialization: coachLessons_coachLessons_subjectSpecialization;
}

export interface coachLessons {
  coachLessons: coachLessons_coachLessons[];
}
