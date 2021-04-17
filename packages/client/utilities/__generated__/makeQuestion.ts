/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateQuestionInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: makeQuestion
// ====================================================

export interface makeQuestion_makeQuestion {
  __typename: "Question";
  id: string;
  body: string;
}

export interface makeQuestion {
  makeQuestion: makeQuestion_makeQuestion;
}

export interface makeQuestionVariables {
  createQuestionInput: CreateQuestionInput;
}
