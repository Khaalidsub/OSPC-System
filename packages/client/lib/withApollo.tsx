import {  HttpLink, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws';
import {SubscriptionClient} from 'subscriptions-transport-ws'
import { getMainDefinition } from '@apollo/client/utilities';
import { isBrowser } from './isBrowser';
import { authHttpLink, authWsLink, getTokenFromCookie } from './utils';
const getProductionUrl = ()=>{
  return isBrowser ? `http://${process.env.NEXT_PUBLIC_URL}`:`http://${process.env.NEXT_PUBLIC_URL_SERVER}`
}
export const httpLink = new HttpLink({
    
    uri: process.env.NODE_ENV === 'production'?  getProductionUrl() : `http://localhost:3001/graphql`,
})
export const wsLink = isBrowser ?  new SubscriptionClient(
    process.env.NODE_ENV === 'production'?  `ws://${process.env.NEXT_PUBLIC_URL}` : `ws://localhost:3001/graphql`,
    {
      reconnect: true,
    connectionParams:{
        authorization:  getTokenFromCookie() ? `Bearer ${getTokenFromCookie()}` : '',
    }
  }) : null;


export const link = isBrowser ?  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    new WebSocketLink(wsLink),
    authHttpLink.concat(httpLink),
  )  : authHttpLink.concat(httpLink);