import { NextPageContext } from "next";
// import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export interface NextContextWithApollo extends NextPageContext {
    apolloClient: ApolloClient<NormalizedCacheObject>;
}