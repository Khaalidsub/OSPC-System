import { InputField, PrimaryButton } from 'components'
import React from 'react'

export default function Register() {
    return (
        <div className="mx-14 my-auto">
            <div className="flex flex-row bg-white shadow-md rounded-lg">
                <img src="/assets/study.jpg" className="w-2/5 object-cover rounded-l-lg" alt="" />
                <div className="w-3/5 px-6 py-6 space-y-4">
                    <h3 className="font-bold">Create an Account</h3>
                    <InputField onChange={() => { }} type="" placeholder="" label="Name" />
                    <InputField onChange={() => { }} type="" placeholder="" label="Email" />
                    <InputField onChange={() => { }} type="" placeholder="" label="Password" />
                    <InputField onChange={() => { }} type="" placeholder="" label="Confirm Password" />
                    <InputField onChange={() => { }} type="" placeholder="" label="University" />
                    <PrimaryButton label="Create an Account" />
                </div>

            </div>
        </div>
    )
}
