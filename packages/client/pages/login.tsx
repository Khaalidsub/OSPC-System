import { useMutation } from '@apollo/client';
import { InputField, PrimaryButton } from 'components'
import { useAuth } from 'lib/auth'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { LOGIN_USER } from 'utilities/schema';
import * as LoginTypes from "../utilities/__generated__/login";
export const Login = () => {
    const cookie = new Cookies();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signIn, { error }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(LOGIN_USER, {
        onCompleted(data?) {

            cookie.set('auth_token', data.loginUser.token)
            cookie.set('user', data.loginUser.user)
            console.log('here in the login', data);

            router.back()
        }
    })
    const router = useRouter()
    // const { login, isSignedIn } = useAuth()
    // console.log(isSignedIn);

    const onSubmit = async (e: Event) => {
        e.preventDefault()
        try {

            await signIn({ variables: { email, password } })
        } catch (error) {

            console.log('hello there', error.message);

        }
    }
    return (
        <div className="mx-14 my-auto">
            <div className="flex flex-row bg-white shadow-md rounded-lg">
                <img src="/assets/study.jpg" className="w-2/5 object-cover rounded-l-lg" alt="" />
                <div className="w-3/5 px-20 py-6 space-y-4">
                    <h3 className="font-bold">Sign in</h3>
                    <InputField type="text" onChange={setEmail} placeholder="Email" label="Email" />
                    <InputField type="password" onChange={setPassword} placeholder="Password" label="Password" />
                    <PrimaryButton onClick={onSubmit} label="Sign In" />
                </div>

            </div>
        </div>
    )
}

export default Login
