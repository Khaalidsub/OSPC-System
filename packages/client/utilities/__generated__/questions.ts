/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionSort, QuestionSearch } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: questions
// ====================================================

export interface questions_questions_questions_subject {
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

export interface questions_questions_questions_user {
  __typename: "User";
  id: string | null;
  name: string;
}

export interface questions_questions_questions {
  __typename: "Question";
  id: string;
  title: string;
  body: string;
  answers: number;
  subject: questions_questions_questions_subject;
  createdAt: any;
  updatedAt: any;
  user: questions_questions_questions_user;
}

export interface questions_questions {
  __typename: "QuestionConnection";
  totalDocs: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  page: number;
  nextPage: number;
  prevPage: number;
  pagingCounter: number;
  questions: questions_questions_questions[] | null;
}

export interface questions {
  questions: questions_questions;
}

export interface questionsVariables {
  page?: number | null;
  limit?: number | null;
  sort?: QuestionSort | null;
  query?: QuestionSearch | null;
}
