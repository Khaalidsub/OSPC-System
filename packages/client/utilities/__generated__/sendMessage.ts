/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMessageInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: sendMessage
// ====================================================

export interface sendMessage_createMessage_sender {
  __typename: "User";
  id: string | null;
  image: string;
}

export interface sendMessage_createMessage_chat {
  __typename: "Chat";
  id: string;
}

export interface sendMessage_createMessage {
  __typename: "Message";
  id: string;
  sender: sendMessage_createMessage_sender;
  chat: sendMessage_createMessage_chat;
  input: string;
  createdAt: any;
  updatedAt: any;
}

export interface sendMessage {
  createMessage: sendMessage_createMessage;
}

export interface sendMessageVariables {
  createMessageInput: CreateMessageInput;
}
