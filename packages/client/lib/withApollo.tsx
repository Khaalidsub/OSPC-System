import {  HttpLink, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { isBrowser } from './isBrowser';
import { authHttpLink, authWsLink } from './utils';
// const host = process.env.NEXT_PUBLIC_BACKEND || 'localhost'
// const port = process.env.NEXT_PUBLIC_BACKEND_PORT || '3001'
//  const url = process.env.NEXT_PUBLIC_URL || 'localhost:3001/graphql';
export const httpLink = new HttpLink({

    uri: process.env.NODE_ENV === 'production'?  `http://${process.env.NEXT_PUBLIC_URL}` : `http://localhost:3001/graphql`,
})

export const wsLink = isBrowser ?  new WebSocketLink({
    uri: process.env.NODE_ENV === 'production'?  `ws://${process.env.NEXT_PUBLIC_URL}` : `ws://localhost:3001/graphql`,
    
  }) : null;

export const link = isBrowser ?  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    authWsLink.concat(wsLink),
    authHttpLink.concat(httpLink),
  )  : authHttpLink.concat(httpLink);