/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: answers
// ====================================================

export interface answers_answers_user {
  __typename: "User";
  id: string | null;
  name: string;
}

export interface answers_answers {
  __typename: "Answer";
  id: string;
  input: string;
  votes: number;
  user: answers_answers_user;
  isApproved: boolean;
  createdAt: any;
}

export interface answers {
  answers: answers_answers[];
}

export interface answersVariables {
  id: string;
}
