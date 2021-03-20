import { gql } from '@apollo/client';
//fragments
export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    name
    email
    role
    accountStatus
    coachingStatus
  }
`;

export const IS_AUTHORIZED = gql`
  mutation isAuthorized {
    isAuthorized
  }
`;
//Mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;
// Query
export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const USERS = gql`
  query users {
    users {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;
// Subscription
