import { useMutation } from "@apollo/client";
import { SecondarySelectField } from "components";
import { PrimaryButton, SecondaryButton } from "components/Buttons"
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react"
import { ADD_MODERATOR } from "utilities/schema";
import { valdiateRegister } from "utilities/validate";
import * as ModeratorRegisterType from 'utilities/__generated__/addModerator'
function AddModerator() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [CPassword, setConfirmPassword] = useState('')
    const [university, setUniversity] = useState('')
    const [message, setError] = useState('')
    const [addModerator, { error }] = useMutation<ModeratorRegisterType.addModerator, ModeratorRegisterType.addModeratorVariables>(ADD_MODERATOR)

    const onSubmit = async ({ email, password, university, name, ...values }) => {
        try {
            console.log(email, password, university, name, values);
            await addModerator({ variables: { createUserInput: { email: email, password: password, university: university, name } } })
            router.back()
        } catch (error) {

            setError(error.message)

        }
    }
    const formik = useFormik<any>({
        initialValues: {
            email,
            CPassword,
            university,
            password,
        },
        validate: valdiateRegister,
        onSubmit: onSubmit
    })
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
        <div className="grid grid-cols-1">
            <div className="flex flex-col space-y-8 w-3/6 place-self-center">
                <div className="grid grid-cols-1 bg-white py-12 rounded-xl shadow-md space-y-4">
                    <h4 className="text-4xl text-center">Add Moderator</h4>
                    <form onSubmit={formik.handleSubmit} className=" px-20 py-6 space-y-4 flex flex-col">
                        {formik.touched.FIELD_NAME && formik.errors.FIELD_NAME ? (
                            <div className="bg-red " >{formik.errors.FIELD_NAME}</div>
                        ) : null}

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

                        <div className="w-full self-center text-center">
                            <hr className="border-t-1 w-full border-primary my-2" />

                        </div>
                        <div className="self-center text-center w-full">

                            {/* <PrimaryButton label="Create an Account" /> */}
                        </div>
                        <div className="w-3/5 mx-auto">

                            <SecondaryButton label='Add Moderator' />

                        </div>
                    </form>



                </div>

            </div>
        </div>
    )
}

export default AddModerator
