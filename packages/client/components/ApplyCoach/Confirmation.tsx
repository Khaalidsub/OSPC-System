import { SecondaryButton } from "components/Buttons"
import React from "react"
import { ScheduleInputType } from "__generated__/globalTypes"

export const ConfirmationDetails = ({ onSubmit, weeklySchedule, subjectSpec, subject }) => {
    const RenderTableBody = () => {
        return (
            <>
                {weeklySchedule.schedule?.map((scheduleValue: ScheduleInputType) => {
                    return (
                        <tr className='font-raleway' key={scheduleValue.day} >
                            <td className='text-center capitalize'>{scheduleValue.day}</td>
                            <td>
                                <div className='p-3  flex flex-row items-center space-x-2 justify-center'>
                                    <p>{scheduleValue.time_start}:00</p>
                                </div>
                            </td>
                            <td>
                                <div className='p-3  flex flex-row items-center space-x-2 justify-center'>
                                    <p>{scheduleValue.time_end}:00</p>

                                </div>
                            </td>

                        </tr>
                    )
                })}
            </>
        )

    }
    const RenderSubjectDescriptions = () => {
        return (
            <>
                {subjectSpec?.specialization?.map((subjectDesc) => {
                    return (
                        <div className='flex flex-row items-center space-x-8'>


                            <h4 className=''>{subjectDesc.title}</h4>
                        </div>
                    )
                })}
            </>)
    }
    return (
        <div className='flex flex-col space-y-12 mt-8'>
            <div className='grid grid-cols-3 gap-14'>
                <div className=' flex flex-col justify-between'>
                    <div className='bg-white shadow-lg rounded-md p-4'>
                        <h2 className='text-2xl'>Subject Chosen</h2>
                        <h3>{subject.name}</h3>
                    </div>
                    <div className='bg-white shadow-lg rounded-md p-4'>
                        <h2 className='text-2xl mb-4'>Specification</h2>
                        <RenderSubjectDescriptions />
                    </div>
                </div>
                <div className='col-span-2 bg-white shadow-lg rounded-md p-4'>
                    <h2 className='text-center text-3xl m-2 mb-4'>Schedule</h2>
                    <table className='w-full table-fixed'>
                        <thead className='font-poppins'>
                            <tr>
                                <th>Day</th>
                                <th>Starting Time</th>
                                <th>Ending Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <RenderTableBody />
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='self-center w-1/3 text-lg'>
                <SecondaryButton color='bg-secondary' onClick={onSubmit} label='Apply' />
            </div>
        </div >
    )
}