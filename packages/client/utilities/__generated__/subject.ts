/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subject
// ====================================================

export interface subject_subject {
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
  image: string;
  /**
   * Example field (placeholder)
   */
  description: string;
  coaches: number;
}

export interface subject {
  subject: subject_subject;
}

export interface subjectVariables {
  id: string;
}
