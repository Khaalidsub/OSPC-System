import { SecondaryButton, SelectField } from "components"
import React from "react"

export const Students = () => {

    const SearchField = () => {
        return (
            <div className="bg-white rounded-md shadow-lg flex flex-row items-center space-x-2">
                <img className="h-4 w-4 ml-2" src="/assets/search.svg" alt="" />
                <input className="border border-none rounded w-full placeholder-gray-500 focus:outline-none focus:border-transparent  " type="text" placeholder="Search Coaches" />
            </div>
        )
    }

    const Student = () => {
        return (
            <div className="flex flex-row bg-white  justify-between rounded-lg shadow-md  p-4 space-y-4">
                <div className="flex flex-row space-x-4">

                    <img className="h-28 w-28 rounded-full" src="/fake_images/Rectangle 798.png" alt="" />
                    <div className="flex flex-col justify-between">


                        <h2 className="font-raleway text-2xl" >Sasha Liskov</h2>
                        <h4>UTM</h4>

                    </div>
                </div>

                <div className="flex flex-col px-6 w-60  justify-between">
                    <SecondaryButton onClick={() => {
                    }} color='bg-secondary' label="Approve" />
                    <SecondaryButton color="bg-red-800" label="Reject" />
                </div>

            </div>
        )
    }
    return (
        <div className="grid grid-cols-1" >
            <div className="flex flex-col space-y-8 w-3/5 place-self-center ">
                <h2 className="text-4xl">List of Students Registration Status</h2>
                <div className="grid grid-cols-2">
                    <SearchField />
                    <div className='justify-self-end self-center'>

                        <SelectField label='Status' options={['approved', 'rejected', 'pending  ']} />
                    </div>
                </div>
                <Student />


            </div>
        </div>
    )
}

export default Students