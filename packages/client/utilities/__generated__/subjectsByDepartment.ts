/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: subjectsByDepartment
// ====================================================

export interface subjectsByDepartment_subjectsByDepartment_department {
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

export interface subjectsByDepartment_subjectsByDepartment {
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
  /**
   * Example field (placeholder)
   */
  department: subjectsByDepartment_subjectsByDepartment_department;
}

export interface subjectsByDepartment {
  subjectsByDepartment: subjectsByDepartment_subjectsByDepartment[];
}

export interface subjectsByDepartmentVariables {
  id: string;
}
