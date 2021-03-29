
import * as React from "react";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import redirect from "../lib/redirect";
import { CURRENT_USER } from "utilities/schema";
import * as CurrentTypes from 'utilities/__generated__/currentUser'
import { CoachingStatus, Role } from "__generated__/globalTypes";
import Cookies from "universal-cookie";
import { AUTH_TOKEN } from "lib/utils";


export const withAuth = <T extends object>(C: any) => {
    const AuthComponent = ({ props }) => {


        return (
            <C {...props} />
        )
    };
    AuthComponent.getInitialProps = async ({
        apolloClient,
        ...ctx
    }: NextContextWithApollo) => {
        // console.log('hello world', a);
        const cookies = new Cookies(ctx.req?.headers.cookie)
        try {

            const response = await apolloClient?.query<CurrentTypes.currentUser>({ query: CURRENT_USER, context: { token: cookies.get(AUTH_TOKEN) } });
            // console.log('so liek', response?.data);

            if (response.data.currentUser.accountStatus === CoachingStatus.pending) {

                redirect(ctx, "/pending");
                return {
                    currentUser: response.data.currentUser
                }
            }
            if (response.data.currentUser.accountStatus === CoachingStatus.inactive) {

                redirect(ctx, "/login");
                return {
                    currentUser: null
                }
            }

            return {
                currentUser: response.data.currentUser,
            };
        } catch (error) {
            console.log(error);
            if (cookies.get('user')) {
                cookies.remove('user')
            }
            if (cookies.get('auth_token')) {
                cookies.remove('auth_token')
            }



            redirect(ctx, "/login");
            return {
                currentUser: null,

            }
        }
    }
    return AuthComponent
};

export const withAdminAuth = <T extends object>(C: any) => {
    const AdminAuthComponent = ({ props }) => {


        return (
            <C {...props} />
        )
    };

    AdminAuthComponent.getInitialProps = async ({
        apolloClient,
        ...ctx
    }: NextContextWithApollo) => {
        const cookies = new Cookies(ctx?.req.headers.cookie)
        try {

            const response = await apolloClient?.query<CurrentTypes.currentUser>({ query: CURRENT_USER, context: { token: cookies.get(AUTH_TOKEN) } });
            if (response.data.currentUser.role === Role.coach) {
                redirect(ctx, "/coach");
                return {
                    currentUser: response.data.currentUser
                }
            }
            if (response.data.currentUser.role === Role.student) {
                redirect(ctx, "/dashboard");
                return {
                    currentUser: response.data.currentUser
                }
            }
            if (response.data.currentUser.role === Role.moderator) {
                redirect(ctx, "/moderator");
                return {
                    currentUser: response.data.currentUser
                }
            }
            return {
                currentUser: response.data.currentUser
            }
        } catch (error) {
            if (cookies.get('user')) {
                cookies.remove('user')
            }
            if (cookies.get('auth_token')) {
                cookies.remove('auth_token')
            }
            redirect(ctx, "/login");
            return {
                currentUser: null,
            };
        }

    }
    return AdminAuthComponent
}
export const withModeratorAuth = <T extends object>(C: any) => {
    const ModeratorComponent = ({ props }) => {


        return (
            <C {...props} />
        )
    };

    ModeratorComponent.getInitialProps = async ({
        apolloClient,
        ...ctx
    }: NextContextWithApollo) => {
        const cookies = new Cookies(ctx?.req.headers.cookie)
        try {

            const response = await apolloClient?.query<CurrentTypes.currentUser>({ query: CURRENT_USER, context: { token: cookies.get(AUTH_TOKEN) } });
            if (response.data.currentUser.role === Role.student) {
                redirect(ctx, "/dashboard");
                return {
                    currentUser: response.data.currentUser
                }
            }
            if (response.data.currentUser.role === Role.coach) {
                redirect(ctx, "/coach");
                return {
                    currentUser: response.data.currentUser
                }
            }
            return {
                currentUser: response.data.currentUser
            }
        } catch (error) {
            if (cookies.get('user')) {
                cookies.remove('user')
            }
            if (cookies.get('auth_token')) {
                cookies.remove('auth_token')
            }
            redirect(ctx, "/login");
            return {
                currentUser: null,
            };
        }

    }
    return ModeratorComponent
}
export const withCoachAuth = <T extends object>(C: any) => {
    const CoachAuthComponent = ({ props }) => {


        return (
            <C {...props} />
        )
    };

    CoachAuthComponent.getInitialProps = async ({
        apolloClient,
        ...ctx
    }: NextContextWithApollo) => {
        const cookies = new Cookies(ctx?.req.headers.cookie)
        try {

            const response = await apolloClient?.query<CurrentTypes.currentUser>({ query: CURRENT_USER, context: { token: cookies.get(AUTH_TOKEN) } });

            if (response.data.currentUser.role === Role.student) {
                redirect(ctx, "/dashboard");
                return {
                    currentUser: response.data.currentUser
                }
            }
            if (response.data.currentUser.role === Role.moderator) {
                redirect(ctx, "/moderator");
                return {
                    currentUser: response.data.currentUser
                }
            }
            return {
                currentUser: response.data.currentUser
            }
        } catch (error) {
            if (cookies.get('user')) {
                cookies.remove('user')
            }
            if (cookies.get('auth_token')) {
                cookies.remove('auth_token')
            }
            redirect(ctx, "/login");
            return {
                currentUser: null,
            };
        }

    }
    return CoachAuthComponent
}