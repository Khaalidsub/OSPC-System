import Cookies from 'universal-cookie';

var cookies = new Cookies();

function getTokenFromCookie() {
    if (cookies.get('auth_token')) {
        return cookies.get('auth_token');
    } else {
        return null;
    }
}

function getUserFromCookie(): currentUser_currentUser {
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
import { currentUser_currentUser } from 'utilities/__generated__/currentUser';
// import { CoachingStatus, Role } from '__generated__/globalTypes';

export const AUTH_TOKEN = "auth_token";
export const authHttpLink = setContext((_, context) => {
    // console.log(context, context.req);
    const token = context.token || getTokenFromCookie();


    return {
        headers: {
            ...context.headers,
            // "Access-Control-Allow-Origin": "*",
            authorization: token ? `Bearer ${token}` : '',

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

// const redirectPage = (path: string) => {

//     return {
//         redirect: {

//             destination: path,
//             permanent: false
//         }
//     }
// }


// export const guestUser = ({ req, ...rest }) => {

//     const cookie = new Cookies(req.cookies)
//     const user = cookie.get('user') as currentUser_currentUser

//     console.log('hello therr', cookie.get('user'));
//     if (user === undefined || !user) {
//         return redirectPage('/login')
//     }
//     if (user.accountStatus === CoachingStatus.pending) {
//         return redirectPage('/pending')
//     }

//     return redirectPage('/dashboard')
// }

// export const getUser = ({ req, ...rest }) => {

//     const cookie = new Cookies(req.cookies)
//     const user = cookie.get('user') as currentUser_currentUser

//     console.log('hello therr', cookie.get('user'));
//     if (user === undefined || !user) {
//         return redirectPage('/login')

//     }

//     return {
//         props: {
//             ...rest
//         }
//     }
// }


// export const getAdmin = ({ req, ...rest }) => {
//     const cookie = new Cookies(req.cookies)
//     const user = cookie.get('user') as currentUser_currentUser

//     console.log('hello therr', cookie.get('user'));
//     if (user === undefined || !user) {
//         return redirectPage('/login')

//     }

//     if (user.role !== Role.admin) {
//         return redirectPage('/')
//     }
//     return {
//         props: {
//             ...rest
//         }
//     }
// }


// export const getCoach = ({ req, ...rest }) => {


//     const cookie = new Cookies(req.cookies)
//     const user = cookie.get('user') as currentUser_currentUser

//     console.log('hello therr', cookie.get('user'));
//     if (user === undefined || !user) {
//         return redirectPage('/login')

//     }

//     if (user.role !== Role.coach) {
//         return redirectPage('/')
//     }
//     return {
//         props: {
//             ...rest
//         }
//     }
// }
// export const getModerator = ({ req, ...rest }) => {

//     const cookie = new Cookies(req.cookies)
//     const user = cookie.get('user') as currentUser_currentUser

//     console.log('hello therr', cookie.get('user'));
//     if (user === undefined || !user) {
//         return redirectPage('/login')

//     }

//     if (user.role !== Role.moderator) {
//         return redirectPage('/')
//     }
//     return {
//         props: {
//             ...rest
//         }
//     }
// }