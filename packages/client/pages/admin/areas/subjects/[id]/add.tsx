import { SecondarySelectField } from "components";
import { SecondaryButton } from "components/Buttons"
import React from "react"

function CreateSubject() {
    return (
        <div className="grid grid-cols-1">
            <div className="flex flex-col space-y-8 w-3/6 place-self-center">
                <div className="grid grid-cols-1 bg-white py-12 rounded-xl shadow-md space-y-4">
                    <h4 className="text-4xl text-center">Create Subject Area</h4>
                    <form action="" className="w-3/5 justify-self-center space-y-8">
                        <div className="">
                            <label className="text-sm font-poppins pb-2">Subject Area Name</label>
                            <input name='name' type='text' placeholder='area' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>


                    </form>

                    <div className="w-3/5 justify-self-center">

                        <SecondaryButton label='Add Subject Area' />

                    </div>

                </div>

            </div>
        </div>
    )
}

export default CreateSubject
