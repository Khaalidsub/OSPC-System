/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSubjects
// ====================================================

export interface getSubjects_subjects {
  __typename: "Subject";
  /**
   * Example field (placeholder)
   */
  id: string;
  /**
   * Example field (placeholder)
   */
  name: string;
  /**
   * Example field (placeholder)
   */
  description: string;
  coaches: number;
}

export interface getSubjects {
  subjects: getSubjects_subjects[];
}
