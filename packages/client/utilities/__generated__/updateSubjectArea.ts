/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateDepartmentInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateSubjectArea
// ====================================================

export interface updateSubjectArea_updateDepartment_moderator {
  __typename: "User";
  name: string;
}

export interface updateSubjectArea_updateDepartment {
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
  moderator: updateSubjectArea_updateDepartment_moderator;
}

export interface updateSubjectArea {
  updateDepartment: updateSubjectArea_updateDepartment;
}

export interface updateSubjectAreaVariables {
  id: string;
  updateSubjectArea: UpdateDepartmentInput;
}
