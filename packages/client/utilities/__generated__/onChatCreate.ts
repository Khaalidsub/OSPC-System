/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onChatCreate
// ====================================================

export interface onChatCreate_onChatCreate_users {
  __typename: "User";
  id: string | null;
  name: string;
  image: string;
}

export interface onChatCreate_onChatCreate {
  __typename: "Chat";
  id: string;
  isOpen: boolean;
  users: onChatCreate_onChatCreate_users[];
  createdAt: any;
  updatedAt: any;
}

export interface onChatCreate {
  onChatCreate: onChatCreate_onChatCreate;
}
