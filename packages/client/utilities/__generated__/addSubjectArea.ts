/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateDepartmentInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addSubjectArea
// ====================================================

export interface addSubjectArea_createDepartment_moderator {
  __typename: "User";
  name: string;
}

export interface addSubjectArea_createDepartment {
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
  description: string;
  subjects: number;
  /**
   * Example field (placeholder)
   */
  moderator: addSubjectArea_createDepartment_moderator;
}

export interface addSubjectArea {
  createDepartment: addSubjectArea_createDepartment;
}

export interface addSubjectAreaVariables {
  createSubjectArea: CreateDepartmentInput;
}
