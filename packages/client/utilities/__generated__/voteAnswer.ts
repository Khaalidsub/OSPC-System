/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: voteAnswer
// ====================================================

export interface voteAnswer_voteAnswer {
  __typename: "Answer";
  id: string;
}

export interface voteAnswer {
  voteAnswer: voteAnswer_voteAnswer;
}

export interface voteAnswerVariables {
  id: string;
  vote: boolean;
}
