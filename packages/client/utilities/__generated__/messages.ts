/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: messages
// ====================================================

export interface messages_messages_sender {
  __typename: "User";
  id: string | null;
}

export interface messages_messages_chat {
  __typename: "Chat";
  id: string;
}

export interface messages_messages {
  __typename: "Message";
  id: string;
  sender: messages_messages_sender;
  chat: messages_messages_chat;
  input: string;
  createdAt: any;
  updatedAt: any;
}

export interface messages {
  messages: messages_messages[];
}

export interface messagesVariables {
  id: string;
}
