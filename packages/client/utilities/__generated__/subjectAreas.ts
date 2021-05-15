/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subjectAreas
// ====================================================

export interface subjectAreas_departments_moderator {
  __typename: "User";
  name: string;
}

export interface subjectAreas_departments {
  __typename: "Department";
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
  subjects: number;
  /**
   * Example field (placeholder)
   */
  moderator: subjectAreas_departments_moderator;
}

export interface subjectAreas {
  departments: subjectAreas_departments[];
}
