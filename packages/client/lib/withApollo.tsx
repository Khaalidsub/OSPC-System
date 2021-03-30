import withApollo from 'next-with-apollo'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import Cookies from 'universal-cookie';
import cookie from "cookie";
import { authHttpLink } from './utils';
const url = process.env.NEXT_PUBLIC_URL || 'localhost:3001/graphql';
export const httpLink = new HttpLink({
    uri: `http://${url}`,
    credentials: 'include'
})
