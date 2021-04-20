import { SecondaryButton } from "components"
import React from "react"

export const TopUp = ()=>{
    const TopUpOptions = ()=>{
        return (
            <div className="p-3 rounded-lg bg-white shadow-lg w-1/2 place-self-center text-center">
<h3 className="font-poppins text-xl">RM 50.0</h3>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 ">
            <div className="w-8/12  place-self-center py-6 px-3 bg-white shadow-lg rounded-lg space-y-12">
                <h3 className="text-2xl text-secondary text-center">Top Up Amount</h3>
            <div className="grid grid-cols-3 gap-12 mx-auto">
                <TopUpOptions/>
                <TopUpOptions/>
                <TopUpOptions/>
                <TopUpOptions/>
                <TopUpOptions/>
                <TopUpOptions/>
            </div>
            <div className="w-1/3 mx-auto">
            <SecondaryButton color={'bg-secondary'} label="TOP UP NOW"/>

            </div>
            </div>

        </div>
    )
}

export default TopUp