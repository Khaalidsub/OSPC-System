/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSubjectInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addSubject
// ====================================================

export interface addSubject_createSubject_department {
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

export interface addSubject_createSubject {
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
  department: addSubject_createSubject_department;
}

export interface addSubject {
  createSubject: addSubject_createSubject;
}

export interface addSubjectVariables {
  createSubject: CreateSubjectInput;
}
