import { DisplayError, SecondaryButton } from "components"
import React, { useState } from "react"
import { loadStripe } from '@stripe/stripe-js'
import {
    Elements

} from '@stripe/react-stripe-js'
import { SplitForm } from "components/Payment"
const stripePromise = loadStripe('pk_test_51HvvGmKkLdH6RPnGfX3FYTYmLrwnuaJHCbUsc3w0nWzCFDhuamqMTQ97ZEZ4RklWIFrbFAtEEetIenmDKMorAX6p00jih0rO4N');
export const Payment = () => {
    const [message, setError] = useState('')

    // const options = useOptions();
    return (
        <div className='grid grid-cols-1'>
            <div className='flex felx-col space-y-4 w-2/3 place-self-center bg-white rounded-lg shadow-md'>
                <img src="/assets/booking.jpg" className="w-2/5 object-cover rounded-l-lg" alt="" />
                <div className="grid grid-cols-1 w-full space-y-12 pb-8">
                    <div className="text-center">

                        <h3 className="text-2xl">Top Up</h3>
                        <p className="text-sm"></p>
                        {message && <DisplayError message={message} setError={setError} />}
                    </div>

                    <Elements stripe={stripePromise}>
                        <SplitForm />
                    </Elements>



                </div>
            </div>

        </div>
    )
}
export default Payment