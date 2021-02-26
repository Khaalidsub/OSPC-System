import React from "react";
import "tailwindcss/tailwind.css";
import MainLayout from "../Layouts/MainLayout";
import 'styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
