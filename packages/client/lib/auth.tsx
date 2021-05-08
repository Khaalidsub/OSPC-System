import { createContext, useContext, useState } from 'react';
import Cookies from 'universal-cookie';
import { currentUser ,currentUser_currentUser} from 'utilities/__generated__/currentUser';
import {  Role, } from '__generated__/globalTypes';
import { AUTH_TOKEN, deleteTokenFromCookie, deleteUserFromCookie } from './utils';
const defaultContext = {


  isSignedIn: () => false,
  logout: () => { },
  // isActive:()=>false,
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
    // login,
    logout,
    isSignedIn,
    isAuthorized,
    // isActive
  };
}
