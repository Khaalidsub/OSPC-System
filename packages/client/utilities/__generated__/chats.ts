/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: chats
// ====================================================

export interface chats_chats_users {
  __typename: "User";
  id: string | null;
  name: string;
  image: string;
}

export interface chats_chats {
  __typename: "Chat";
  id: string;
  isOpen: boolean;
  users: chats_chats_users[];
  createdAt: any;
  updatedAt: any;
}

export interface chats {
  chats: chats_chats[];
}
