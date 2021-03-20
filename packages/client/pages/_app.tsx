import React from "react";
import "tailwindcss/tailwind.css";
// import MainLayout from "../Layouts/MainLayout";
import 'styles/globals.css'
import MainLayout from "Layouts/MainLayout";
import App from "next/app";
import withApollo from "next-with-apollo";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { authHttpLink, AUTH_TOKEN } from "lib/utils";
import { AuthContext, useProviderAuth } from "lib/auth";
function MyApp({ Component, pageProps, apollo }) {
  // console.log('what is this', Component());

  const auth = useProviderAuth();
  return (
    <ApolloProvider client={apollo}>
      <AuthContext.Provider value={auth}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthContext.Provider>
    </ApolloProvider>
  )
}

export default withApollo(({ initialState }) => {

  return new ApolloClient({
    link: authHttpLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),

  })
})(MyApp);
MyApp.getInitialProps = async appContext => {

  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}


const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include'
})

