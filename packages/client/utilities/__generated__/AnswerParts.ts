/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AnswerParts
// ====================================================

export interface AnswerParts_user {
  __typename: "User";
  id: string | null;
  name: string;
}

export interface AnswerParts {
  __typename: "Answer";
  id: string;
  input: string;
  votes: number;
  user: AnswerParts_user;
  isApproved: boolean;
  createdAt: any;
}
