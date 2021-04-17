/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: question
// ====================================================

export interface question_question_subject {
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

export interface question_question_user {
  __typename: "User";
  id: string | null;
  name: string;
}

export interface question_question {
  __typename: "Question";
  id: string;
  title: string;
  body: string;
  subject: question_question_subject;
  createdAt: any;
  updatedAt: any;
  user: question_question_user;
}

export interface question {
  question: question_question;
}

export interface questionVariables {
  id: string;
}
