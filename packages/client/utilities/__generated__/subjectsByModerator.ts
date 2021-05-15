/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subjectsByModerator
// ====================================================

export interface subjectsByModerator_subjectsByModerator_department {
  __typename: "Department";
  /**
   * Example field (placeholder)
   */
  id: string;
  /**
   * Example field (placeholder)
   */
  name: string;
}

export interface subjectsByModerator_subjectsByModerator {
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
  /**
   * Example field (placeholder)
   */
  image: string;
  coaches: number;
  /**
   * Example field (placeholder)
   */
  department: subjectsByModerator_subjectsByModerator_department;
}

export interface subjectsByModerator {
  subjectsByModerator: subjectsByModerator_subjectsByModerator[];
}
