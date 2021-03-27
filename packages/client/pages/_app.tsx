import React from "react";
import "tailwindcss/tailwind.css";
// import MainLayout from "../Layouts/MainLayout";
import 'styles/globals.css'
import MainLayout from "Layouts/MainLayout";
import App from "next/app";
import withApollo from "next-with-apollo";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { authHttpLink, AUTH_TOKEN } from "lib/utils";
import { AuthContext, useProviderAuth } from "lib/auth";
import { httpLink } from "lib/withApollo";
import { isBrowser } from "lib/isBrowser";
function MyApp({ Component, pageProps, apollo }) {
  // console.log('what is this', Component());

  const auth = useProviderAuth();
  return (

    <ApolloProvider client={apollo}>
      <AuthContext.Provider value={auth}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        {/* <div id="modal" className='' ></div> */}
      </AuthContext.Provider>
    </ApolloProvider>

  )
}
MyApp.getInitialProps = async (appContext) => {
  // console.log('wassup');
  const appProps = await App.getInitialProps(appContext as any)
  return { ...appProps }
}

const AppApollo = withApollo(({ initialState }) => {
  // console.log(initialState);

  // let apolloClient: ApolloClient<NormalizedCacheObject>;
  return new ApolloClient({
    ssrMode: !isBrowser,
    connectToDevTools: isBrowser,
    link: authHttpLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),

  })


})(MyApp,);


// AppApollo.getInitialProps = async appContext => {
//   console.log('hello', appContext.ctx as any);


// }
export default AppApollo