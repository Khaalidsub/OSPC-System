// import fetch from 'isomorphic-unfetch'
// import { ApolloClient } from 'apollo-client'
// import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
// import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from '@apollo/client/link/context'
// import { SubscriptionClient } from 'subscriptions-transport-ws'
import { ApolloClient, InMemoryCache, NetworkStatus } from '@apollo/client'
// import auth0 from './auth0';
let accessToken = null
const requestAccessToken = async () => {
    if (accessToken) return
    const res = await fetch(`${process.env.APP_HOST}/api/session`)
    if (res.ok) {
        const json = await res.json()
        accessToken = json.accessToken
    } else {
        accessToken = 'public'
    }
}
// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }: any) => {
    if (networkError && networkError.name === 'ServerError' && networkError.statusCode as any === 401) {
        accessToken = null
    }
})
const createHttpLink = (headers) => {
    const httpLink = new HttpLink({
        uri: 'https://ready-panda-91.hasura.app/v1/graphql',
        credentials: 'include',
        headers, // auth token is fetched on the server side
        fetch,
    })
    return httpLink;
}
// const createWSLink = () => {
//     return new WebSocketLink(
//         new SubscriptionClient('wss://ready-panda-91.hasura.app/v1/graphql', {
//             lazy: true,
//             reconnect: true,
//             connectionParams: async () => {
//                 await requestAccessToken() // happens on the client
//                 return {
//                     headers: {
//                         authorization: accessToken ? `Bearer ${accessToken}` : '',
//                     },
//                 }
//             },
//         })
//     )
// }

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getTokenFromCookie()?.access_token;
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
})
export default function createApolloClient(initialState, headers) {
    const ssrMode = typeof window === 'undefined'
    let link
    if (ssrMode)
        link = createHttpLink(headers) // executed on server
    // } else {
    //     link = createWSLink() // executed on client
    // }
    return new ApolloClient({
        ssrMode,
        link,
        cache: new InMemoryCache().restore(initialState),
    })
}

function getTokenFromCookie(): any {
    throw new Error('Function not implemented.')
}
// export function initializeApollo(initialState = null) {
//   const _apolloClient = apolloClient ?? withApollo()

//   // If your page has Next.js data fetching methods that use Apollo Client, the initial state
//   // gets hydrated here
//   if (initialState) {
//     // Get existing cache, loaded during client side data fetching
//     const existingCache = _apolloClient.extract()

//     // Merge the existing cache into data passed from getStaticProps/getServerSideProps
//     const data = merge(initialState, existingCache, {
//       // combine arrays using object equality (like in sets)
//       arrayMerge: (destinationArray, sourceArray) => [
//         ...sourceArray,
//         ...destinationArray.filter((d) =>
//           sourceArray.every((s) => !isEqual(d, s))
//         ),
//       ],
//     })

//     // Restore the cache with the merged data
//     _apolloClient.cache.restore(data)
//   }
//   // For SSG and SSR always create a new Apollo Client
//   if (typeof window === 'undefined') return _apolloClient
//   // Create the Apollo Client once in the client
//   if (!apolloClient) apolloClient = _apolloClient

//   return _apolloClient
// }
