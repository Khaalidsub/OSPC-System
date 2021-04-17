import { useMutation } from '@apollo/client';
import { InputField, PrimaryButton } from 'components'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { useFormik } from 'formik'
import { LOGIN_USER } from 'utilities/schema';
import * as LoginTypes from "../utilities/__generated__/login";
import { validateLogin } from 'utilities/validate'
import { Role } from '__generated__/globalTypes';
export const Login = () => {
    const cookie = new Cookies();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setError] = useState('')
    const [signIn, { error }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(LOGIN_USER, {
        onCompleted(data?) {

            cookie.set('auth_token', data.loginUser.token)
            cookie.set('user', data.loginUser.user)
            console.log('here in the login', data);
            if (data.loginUser.user.role === Role.admin) {

                router.push('/admin')
            }
            if (data.loginUser.user.role === Role.moderator) {

                router.push('/moderator')
            }
            if (data.loginUser.user.role === Role.coach) {

                router.push('/coach')
            }
            router.push('/dashboard')
        },
    })
    const router = useRouter()

    const onSubmit = async ({ email, password }) => {
        // e.preventDefault()
        try {
            await signIn({ variables: { email, password } })
        } catch (error) {

            setError(error.message)

        }
    }
    const formik = useFormik<any>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateLogin,
        onSubmit: onSubmit
    })
    const handleLogin = (e) => {
        e.preventDefault()
        router.push('/register')
    }
    const DisplayError = () => {
        return (
            <div className="bg-red-100 space-x-2 items-center border border-red-500 text-red-dark pl-4 pr-8 py-3 rounded flex flex-row" role="alert">
                <span className="">
                    <svg className="h-6 w-6 text-red-800 " onClick={() => {
                        setError('')
                    }} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
                {/* <strong className="font-bold">Error</strong> */}
                <span className="">{message}</span>
            </div>
        )
    }
    return (
        <div className="h-full bg-primary">
            <div className="h-full mx-8 md:mx-36 lg:mx-56 flex flex-col  justify-around items-center">
                <div className=" h-3/4 max-h-full flex flex-row bg-white shadow-lg rounded-lg">
                    <img src="/assets/study.jpg" className="w-2/5 object-cover rounded-l-lg" alt="" />


                    <form className="w-3/5 px-20 md:space-y-8 flex flex-col justify-center" onSubmit={formik.handleSubmit}>
                 
                        <h3 className="font-bold text-2xl">Sign in</h3>
                        {message && <DisplayError />}
                        {/* <InputField {...formik.getFieldProps("email")} name='email' type="text" onChange={setEmail} placeholder="Email" label="Email" /> */}
                        <div className="">
                            {formik.touched.email && formik.errors.email ? (
                                <h4 className="text-red-500 text-xs " >{formik.errors.email}</h4>
                            ) : null}
                            <label className="text-sm font-poppins pb-2">Email</label>
                            <input {...formik.getFieldProps('email')} name='email' type='email' placeholder='email' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        <div className="">
                            {formik.touched.password && formik.errors.password ? (
                                <h4 className="text-red-500 text-xs " >{formik.errors.password}</h4>
                            ) : null}
                            <label className="text-sm font-poppins pb-2">Password</label>
                            <input {...formik.getFieldProps('password')} name='password' type='password' placeholder='password' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        {/* <InputField {...formik.getFieldProps("password")} name='password' type="password" onChange={setPassword} placeholder="Password" label="Password" /> */}
                        <div className="w-full self-center text-center">
                            <hr className="border-t-1 w-full border-primary my-2" />
                            <h3 className="">Don't Have an Account?</h3>
                            <a className="italic font-raleway text-sm hover:underline hover:text-blue-400" href="/register" onClick={handleLogin} >Create an Account</a>
                        </div>
                        <div className="self-center text-center w-full">

                            <PrimaryButton label="Sign In" />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login
