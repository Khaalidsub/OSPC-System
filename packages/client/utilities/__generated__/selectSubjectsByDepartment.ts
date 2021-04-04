/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: selectSubjectsByDepartment
// ====================================================

export interface selectSubjectsByDepartment_subjectsByDepartment {
  __typename: "Subject";
  /**
   * Example field (placeholder)
   */
  id: string;
  /**
   * Example field (placeholder)
   */
  name: string;
}

export interface selectSubjectsByDepartment {
  subjectsByDepartment: selectSubjectsByDepartment_subjectsByDepartment[];
}

export interface selectSubjectsByDepartmentVariables {
  id?: string | null;
}
