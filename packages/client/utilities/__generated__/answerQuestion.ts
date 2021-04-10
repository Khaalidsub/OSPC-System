/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAnswerInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: answerQuestion
// ====================================================

export interface answerQuestion_answerQuestion_user {
  __typename: "User";
  id: string | null;
  name: string;
}

export interface answerQuestion_answerQuestion {
  __typename: "Answer";
  id: string;
  input: string;
  votes: number;
  user: answerQuestion_answerQuestion_user;
  isApproved: boolean;
  createdAt: any;
}

export interface answerQuestion {
  answerQuestion: answerQuestion_answerQuestion;
}

export interface answerQuestionVariables {
  answerQuestionInput: CreateAnswerInput;
}
