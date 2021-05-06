/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MessageParts
// ====================================================

export interface MessageParts_sender {
  __typename: "User";
  id: string | null;
}

export interface MessageParts_chat {
  __typename: "Chat";
  id: string;
}

export interface MessageParts {
  __typename: "Message";
  id: string;
  sender: MessageParts_sender;
  chat: MessageParts_chat;
  input: string;
  createdAt: any;
  updatedAt: any;
}
