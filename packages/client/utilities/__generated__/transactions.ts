/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: transactions
// ====================================================

export interface transactions_myWallet {
  __typename: "UserWallet";
  id: string;
  balance: number;
}

export interface transactions_TransactionHistory {
  __typename: "TransactionHistory";
  id: string;
  createdAt: any;
  amount: number;
}

export interface transactions_BookedLessonHistory {
  __typename: "TransactionHistory";
  id: string;
  createdAt: any;
  amount: number;
}

export interface transactions {
  myWallet: transactions_myWallet | null;
  TransactionHistory: transactions_TransactionHistory[] | null;
  BookedLessonHistory: transactions_BookedLessonHistory[] | null;
}
