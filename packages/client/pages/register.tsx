import { useMutation } from '@apollo/client';

import { InputField, PrimaryButton } from 'components'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { REGISTER_USER } from 'utilities/schema';
import { valdiateRegister } from 'utilities/validate';
import *  as RegisterTypes from 'utilities/__generated__/registerUser'
export default function Register() {

    const router = useRouter()
    const cookie = new Cookies();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setConfirmPassword] = useState('')
    const [university, setUniversity] = useState('')
    const [message, setError] = useState('')
    const [signUp, { error }] = useMutation<RegisterTypes.registerUser, RegisterTypes.registerUserVariables>(REGISTER_USER, {
        onCompleted(data?) {


            // cookie.set('user', data.registerStudent)
            // console.log('here in the login', data);

            router.push('/pending')
        },
    })
    const onSubmit = async ({ email, password, university, name, ...values }) => {
        try {
            console.log(email, password, university, name, values);

            await signUp({ variables: { createUserInput: { email, password, university, name } } })
            // await signIn({ variables: { email, password } })
        } catch (error) {

            setError(error.message)

        }
    }
    const formik = useFormik<any>({
        initialValues: {
            email,
            cPassword,
            university,
            password,
        },
        validate: valdiateRegister,
        onSubmit: onSubmit
    })
    const handleLogin = (e) => {
        e.preventDefault()
        router.push('/login')
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
            <div className="h-full mx-56 flex flex-col justify-around items-center">
                <div className="flex flex-row bg-white shadow-lg rounded-lg">
                    <img src="/assets/study.jpg" className="w-2/5 object-cover rounded-l-lg" alt="" />
                    <form onSubmit={formik.handleSubmit} className="w-3/5 px-20 py-6 space-y-4 flex flex-col">
                        {formik.touched.FIELD_NAME && formik.errors.FIELD_NAME ? (
                            <div>{formik.errors.FIELD_NAME}</div>
                        ) : null}
                        <h3 className="font-bold text-2xl ">Create an Account</h3>
                        {message && <DisplayError />}
                        <div className="">
                            <label className="text-sm font-poppins pb-2">Name</label>
                            <input {...formik.getFieldProps('name')} name='name' type='text' placeholder='name' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        <div className="">
                            <label className="text-sm font-poppins pb-2">Email</label>
                            <input {...formik.getFieldProps('email')} name='email' type='email' placeholder='email' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        <div className="">
                            <label className="text-sm font-poppins pb-2">University</label>
                            <input {...formik.getFieldProps('university')} name='university' type='text' placeholder='university' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        <div className="">
                            <label className="text-sm font-poppins pb-2">Password</label>
                            <input {...formik.getFieldProps('password')} name='password' type='password' placeholder='password' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        <div className="">
                            <label className="text-sm font-poppins pb-2">Confirm Password</label>
                            <input {...formik.getFieldProps('Cpassword')} name='Cpassword' type='password' placeholder='password' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        {/* <InputField onChange={() => { }} type="text" placeholder="name" label="Name" /> */}
                        {/* <InputField onChange={() => { }} type="email" placeholder="email" label="Email" /> */}
                        {/* <InputField onChange={() => { }} type="text" placeholder="university" label="University" /> */}
                        {/* <InputField onChange={() => { }} type="password" placeholder="password" label="Password" /> */}
                        {/* <InputField onChange={() => { }} type="password" placeholder="confirm password" label="Confirm Password" /> */}
                        <div className="w-full self-center text-center">
                            <hr className="border-t-1 w-full border-primary my-2" />
                            <h3 className="">Already Have an Account?</h3>
                            <a className="italic font-raleway text-sm" href="/login" onClick={handleLogin}>Sign In</a>
                        </div>
                        <div className="self-center text-center w-full">

                            <PrimaryButton label="Create an Account" />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

