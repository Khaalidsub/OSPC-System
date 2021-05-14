
import { useQuery } from "@apollo/client"
import { PrimaryButton, SecondaryButton } from "components"
import { withAuth } from "components/withAuth"
import { formatDistance } from "date-fns"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { TRANSACTIONS } from "utililites/schema"
import { profileDefault } from "utililites/util"
import { currentUser_currentUser } from "utililites/__generated__/currentUser"
import { transactions,transactions_BookedLessonHistory,transactions_TransactionHistory,transactions_myWallet } from "utililites/__generated__/transactions"
import { CoachingStatus } from "__generated__/globalTypes"
interface SettingsProps{
currentUser:currentUser_currentUser
}
export const Settings = ({currentUser}:SettingsProps) => {
    const router = useRouter()
    const {name} = currentUser
    const {isRefetch} = router.query
    const{data:transactionsData,refetch} = useQuery<transactions>(TRANSACTIONS)
    // useEffect(() => {console.log('data:',transactionsData);
    // },[transactionsData])
    useEffect(() => {

        if (isRefetch) {
            refetch()
        }
    }, [isRefetch])
    const BookHistory = ({id,createdAt,amount}) => {
        return (

            <div className="grid grid-cols-2 bg-white shadow-md rounded-lg px-5 py-7 items-center">
                <h4 className="font-semibold justify-self-start text-xl">Amount: {amount}.00 STD</h4>
                <span className="justify-self-end  text-center font-raleway font-bold p-1  text-blue-300 rounded-lg px-2">{formatDistance(Date.parse(createdAt), Date.now(), { addSuffix: true })}</span>
            </div>

        )
    }
    const BookHistoryList = ()=>{
      
        
        return (
            <>
              {transactionsData?.BookedLessonHistory.map((transaction)=>{
                return <BookHistory key={transaction.id} {...transaction} />
                })}
            </>
        )
    }

    const TransactionHistory = ({id,createdAt,amount})=>{
    
        
        return (

            <div className="grid grid-cols-2 bg-white shadow-md rounded-lg px-5 py-7 items-center">
                <h4 className="font-semibold justify-self-start text-xl">Amount: RM{amount/100}.00</h4>
                <span className="justify-self-end  text-center font-raleway font-bold p-1  text-blue-300 rounded-lg px-2">{formatDistance(Date.parse(createdAt), Date.now(), { addSuffix: true })}</span>
            </div>

        )
    }
    const TransactionHistoryList = ()=>{
      
        
        return (
            <>
              {transactionsData?.TransactionHistory.map((transaction)=>{
                return <TransactionHistory key={transaction.id} {...transaction} />
                })}
            </>
        )
    }
    return (
        <div className=" mx-20 my-2">
            <div className=" bg-white shadow-md flex flex-col py-6 px-6 rounded-lg space-y-6">
                <div className="grid grid-cols-3">
                    {/* <div></div> */}
                    <div className="col-start-2 flex flex-col space-y-7 items-center">
                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${currentUser.image || profileDefault}`} className="h-44 w-44 rounded-full" alt="" />
                        <h2 className='text-3xl'>{name}</h2>
                        <div className="w-1/3">
                        <SecondaryButton onClick={()=>router.push('settings/upload')} label="Upload image"/>
                        </div>
                      
                    </div>
                    <div className="flex flex-col space-y-4 self-center px-6 w-1/2 justify-self-center">
                    {(currentUser.coachingStatus === CoachingStatus.inactive) &&    <SecondaryButton onClick={() => {
                            router.push('/settings/applycoach')
                        }} color='bg-secondary' label="Apply as Coach" />}

                        <SecondaryButton onClick={() => {router.push('/settings/editprofile')}}color="bg-information" label="Edit Profile" />
                        <SecondaryButton color='bg-secondary' label="Top up" onClick={() =>{router.push('/settings/topup')}}/>
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center">

                    <h3 className='text-lg italic'> Current Balance: {transactionsData?.myWallet?.balance} ST</h3>
                    <div className='w-1/4 space-y-2'>

              
                {/* {(currentUser.coachingStatus === CoachingStatus.active) &&    <SecondaryButton onClick={() => {
                            router.push('/settings/applycoach')
                        }} color='bg-primary' label="Cash Out" />} */}
                    </div>
                </div>
                <div className="grid grid-cols-2 md:gap-24">
                    <div className="flex flex-col space-y-6">
                        <h3 className='text-3xl font-semibold'>
                            Recent Top Ups
                        </h3>
                 
                        <TransactionHistoryList/>
                    </div>

                    <div className="flex flex-col space-y-6">
                        <h3 className='text-3xl font-semibold'>
                            Recent Booking Transactions
                        </h3>
                    <BookHistoryList/>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default withAuth(Settings)