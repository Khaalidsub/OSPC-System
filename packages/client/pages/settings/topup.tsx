import { SecondaryButton } from "components"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import {TopUp as TopUpValue} from '__generated__/globalTypes'
export const TopUp = ()=>{
    const [topupValue, setTopup] = useState(null)
    const router = useRouter()
    useEffect(() => {console.log(topupValue);
    },[topupValue])
    const TopUpOptions = ({cost,coins,topup})=>{
        return (
            <div onClick={()=>{setTopup(topup)}} className={` ${topupValue === topup ? "bg-secondary text-white":"bg-white text-secondary"} hover:shadow-2xl cursor-pointer p-3 py-6 rounded-lg  shadow-lg w-1/2 place-self-center text-center`}>
                <div className="p-4 rounded-lg">

                <h3 className="font-poppins text-xl  ">{coins} ST</h3>
                </div>
                <h3 className="font-poppins text-xs italic text-badgs ">for RM {cost}.0</h3>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 ">
            <div className="w-8/12  place-self-center py-6 px-3 bg-white shadow-lg rounded-lg space-y-12">
                <h3 className="text-2xl text-secondary text-center">Top Up Amount</h3>
            <div className="grid grid-cols-3 gap-12 mx-auto">
                <TopUpOptions cost='2' coins='5' topup={TopUpValue.xsmall}/>
                <TopUpOptions cost='5' coins='10' topup={TopUpValue.small}/>
                <TopUpOptions cost='9' coins='20' topup={TopUpValue.medium}/>
                <TopUpOptions cost='20' coins='50' topup={TopUpValue.large}/>
                <TopUpOptions cost='30' coins='75' topup={TopUpValue.xlarge}/>
                <TopUpOptions cost='35' coins='100' topup={TopUpValue.xxlarge}/>
        
            </div>
            <div className="w-1/3 mx-auto">
            <SecondaryButton onClick={() =>{router.push(`/settings/payment?topup=${topupValue}`)}} color={'bg-secondary'} label="TOP UP NOW"/>

            </div>
            </div>

        </div>
    )
}

export default TopUp