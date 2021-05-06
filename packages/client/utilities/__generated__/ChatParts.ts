/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChatParts
// ====================================================

export interface ChatParts_users {
  __typename: "User";
  id: string | null;
  name: string;
}

export interface ChatParts {
  __typename: "Chat";
  id: string;
  isOpen: boolean;
  users: ChatParts_users[];
  createdAt: any;
  updatedAt: any;
}
