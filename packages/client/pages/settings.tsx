import { PrimaryButton, SecondaryButton } from "components"
import React from "react"

export const Settings = () => {
    const PaymentHistory = () => {
        return (

            <div className="grid grid-cols-2 bg-white shadow-md rounded-lg px-5 py-7 items-center">
                <h4 className="font-semibold justify-self-start text-xl">Lesson CS</h4>
                <span className="justify-self-end  text-center font-raleway font-bold p-1  text-blue-300 rounded-lg px-2">3 days ago</span>
            </div>

        )
    }
    return (
        <div className=" mx-20 my-2">
            <div className=" bg-white shadow-md flex flex-col py-6 px-6 rounded-lg space-y-6">
                <div className="grid grid-cols-3">
                    {/* <div></div> */}
                    <div className="col-start-2 flex flex-col space-y-7 items-center">
                        <img src="/fake_images/Rectangle 824.jpg" className="h-44 w-44 rounded-full" alt="" />
                        <h2 className='text-3xl'>Sasha Liskov</h2>
                    </div>
                    <div className="flex flex-col space-y-4 self-center px-6 w-1/2 justify-self-center">
                        <SecondaryButton color='bg-secondary' label="Apply as Coach" />
                        <SecondaryButton color="bg-information" label="Edit Profile" />
                    </div>
                </div>
                <div className="grid grid-cols-3">

                    <h3>Balance</h3>
                </div>
                <div className="grid grid-cols-2 md:gap-24">
                    <div className="flex flex-col space-y-6">
                        <h3 className='text-3xl font-semibold'>
                            Payment History
                        </h3>
                        <PaymentHistory />
                        <PaymentHistory />
                        <PaymentHistory />
                        <PaymentHistory />

                    </div>

                    <div className="flex flex-col space-y-6">
                        <h3 className='text-3xl font-semibold'>
                            Recent Top ups
                        </h3>
                        <PaymentHistory />
                        <PaymentHistory />
                        <PaymentHistory />
                        <PaymentHistory />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Settings
