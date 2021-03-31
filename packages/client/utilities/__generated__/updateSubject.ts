/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSubjectInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateSubject
// ====================================================

export interface updateSubject_updateSubject_department {
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

export interface updateSubject_updateSubject {
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
  department: updateSubject_updateSubject_department;
}

export interface updateSubject {
  updateSubject: updateSubject_updateSubject;
}

export interface updateSubjectVariables {
  updateSubject: UpdateSubjectInput;
  id: string;
}
