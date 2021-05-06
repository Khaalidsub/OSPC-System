/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onMessageSent
// ====================================================

export interface onMessageSent_onMessageSent_sender {
  __typename: "User";
  id: string | null;
}

export interface onMessageSent_onMessageSent_chat {
  __typename: "Chat";
  id: string;
}

export interface onMessageSent_onMessageSent {
  __typename: "Message";
  id: string;
  sender: onMessageSent_onMessageSent_sender;
  chat: onMessageSent_onMessageSent_chat;
  input: string;
  createdAt: any;
  updatedAt: any;
}

export interface onMessageSent {
  onMessageSent: onMessageSent_onMessageSent;
}

export interface onMessageSentVariables {
  id: string;
}
