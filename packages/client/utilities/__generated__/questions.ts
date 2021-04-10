/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: questions
// ====================================================

export interface questions_questions_subject {
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

export interface questions_questions_user {
  __typename: "User";
  id: string | null;
  name: string;
}

export interface questions_questions {
  __typename: "Question";
  id: string;
  title: string;
  body: string;
  subject: questions_questions_subject;
  createdAt: any;
  updatedAt: any;
  user: questions_questions_user;
}

export interface questions {
  questions: questions_questions[];
}
