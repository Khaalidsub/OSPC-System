/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput, Role, CoachingStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addModerator
// ====================================================

export interface addModerator_addModerator {
  __typename: "User";
  id: string | null;
  name: string;
  email: string;
  university: string;
  phoneNumber: number | null;
  role: Role | null;
  accountStatus: CoachingStatus | null;
  coachingStatus: CoachingStatus | null;
}

export interface addModerator {
  addModerator: addModerator_addModerator;
}

export interface addModeratorVariables {
  createUserInput: CreateUserInput;
}
