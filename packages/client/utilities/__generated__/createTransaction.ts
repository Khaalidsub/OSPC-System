/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TopUp, CreateTransactionInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createTransaction
// ====================================================

export interface createTransaction_createPayment {
  __typename: "TransactionHistory";
  id: string;
}

export interface createTransaction {
  createPayment: createTransaction_createPayment;
}

export interface createTransactionVariables {
  topup: TopUp;
  transaction: CreateTransactionInput;
}
