import Cookies from 'universal-cookie';

var cookies = new Cookies();

function getTokenFromCookie() {
    if (cookies.get('auth_token')) {
        return cookies.get('auth_token');
    } else {
        return null;
    }
}

function getUserFromCookie() {
    if (cookies.get('user')) {
        return cookies.get('user');
    } else {
        return null;
    }
}

function deleteTokenFromCookie() {
    if (cookies.get('auth_token')) {
        cookies.remove('auth_token');
    }
}

function deleteUserFromCookie() {
    if (cookies.get('user')) {
        cookies.remove('user');
    }
} import { setContext } from "@apollo/client/link/context";

export const AUTH_TOKEN = "auth_token";
export const authHttpLink = setContext((_, { headers }) => {
    const cookie = new Cookies()

    return {
        headers: {
            ...headers,
            // "Access-Control-Allow-Origin": "*",
            authorization: cookie.get(AUTH_TOKEN) ? `Bearer ${cookie.get(AUTH_TOKEN)}` : '',

        },
    };
});




export {
    getTokenFromCookie,
    getUserFromCookie,
    deleteTokenFromCookie,
    deleteUserFromCookie,
    // checkUser
};
