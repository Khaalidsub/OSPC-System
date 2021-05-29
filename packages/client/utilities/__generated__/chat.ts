/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: chat
// ====================================================

export interface chat_chat_users {
  __typename: "User";
  id: string | null;
  name: string;
  image: string;
}

export interface chat_chat {
  __typename: "Chat";
  id: string;
  isOpen: boolean;
  users: chat_chat_users[];
  createdAt: any | null;
  updatedAt: any;
}

export interface chat {
  chat: chat_chat;
}

export interface chatVariables {
  id: string;
}
