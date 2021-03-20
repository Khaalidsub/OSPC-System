import {
  useMutation,
} from '@apollo/client';
import { createContext, useContext, useState } from 'react';
import Cookies from 'universal-cookie';
import { LOGIN_USER } from 'utilities/schema';
import { currentUser_currentUser } from 'utilities/__generated__/currentUser';
import { Role, } from '__generated__/globalTypes';
import * as LoginTypes from "../utilities/__generated__/login";
import { AUTH_TOKEN, deleteTokenFromCookie, deleteUserFromCookie } from './utils';
const defaultContext = {

  login: async ({ email, password }) => { },
  isSignedIn: () => false,
  logout: () => { },
  isAuthorized: (role: Role) => false
};

export const AuthContext = createContext(defaultContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function useProviderAuth() {

  const cookie = new Cookies();
  const logout = () => {
    deleteUserFromCookie()
    deleteTokenFromCookie()
  };

  const login = async ({ email, password }) => {

    const [signIn, { error }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(LOGIN_USER)


    const result = await signIn({ variables: { email, password } })
    console.log(result);
    if (result.data) {
      cookie.set('auth_token', result.data.loginUser.token)
      cookie.set('user', result.data.loginUser.user)
    }


  };

  const isSignedIn = () => {
    if (cookie.get(AUTH_TOKEN)) {
      return true;
    } else {
      return false;
    }
  };

  const isAuthorized = (role: Role) => {
    console.log('auth', cookie.get('user') as currentUser_currentUser);
    const user = cookie.get('user') as currentUser_currentUser
    if (user) {
      if (user.role === Role.admin) {
        return true;
      }
      if (user.role !== role) {
        return false;
      }
      return true;
    }
    return false;
  }

  return {
    login,
    logout,
    isSignedIn,
    isAuthorized
  };
}
