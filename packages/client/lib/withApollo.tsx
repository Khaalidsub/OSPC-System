import {  HttpLink } from '@apollo/client'
// const host = process.env.NEXT_PUBLIC_BACKEND || 'localhost'
// const port = process.env.NEXT_PUBLIC_BACKEND_PORT || '3001'
//  const url = process.env.NEXT_PUBLIC_URL || 'localhost:3001/graphql';
export const httpLink = new HttpLink({
    uri: process.env.NODE_ENV === 'production'?  `http://${process.env.NEXT_PUBLIC_URL}` : `http://localhost:3001/graphql`,
})
