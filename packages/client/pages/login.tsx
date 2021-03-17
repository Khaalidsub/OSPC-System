import { InputField, PrimaryButton } from 'components'
import React from 'react'

export default function Login() {
    return (
        <div className="mx-14 my-auto">
            <div className="flex flex-row bg-white shadow-md rounded-lg">
                <img src="/assets/study.jpg" className="w-2/5 object-cover rounded-l-lg" alt="" />
                <div className="w-3/5 px-20 py-6 space-y-4">
                    <h3 className="font-bold">Sign in</h3>
                    <InputField label="Email" />
                    <InputField label="Password" />
                    <PrimaryButton label="Sign In" />
                </div>

            </div>
        </div>
    )
}
