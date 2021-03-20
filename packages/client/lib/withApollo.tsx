import withApollo from 'next-with-apollo'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import Cookies from 'universal-cookie';
import cookie from "cookie";
import { authHttpLink } from './utils';
const httpLink = new HttpLink({
    uri: 'http://localhost:3001/graphql',
    credentials: 'include'
})
