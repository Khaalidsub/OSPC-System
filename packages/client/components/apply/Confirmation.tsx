import { useContext } from "react"
import { ScheduleInputType } from "__generated__/globalTypes"
import { ApplicationContext } from "./applicationContext"

export const ConfirmationDetails = ({ onSubmit }) => {
    const { weeklySchedule, subjectSpecialization, slide, setSlide, subject } = useContext(ApplicationContext)
    const RenderTableBody = () => {

        return (
            <>
                {weeklySchedule.schedule.map((scheduleValue: ScheduleInputType) => {
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
    const SecondaryButton = ({ label, }: any) => {

        return (
            <button type="submit" onClick={onSubmit} className={` w-40 rounded-lg py-2 px-4 font-raleway text-white bg-secondary shadow-lg font-semibold text-xl`}>
                {label}
            </button>
        )
    }
    const RenderSubjectDescriptions = () => {
        return (
            <>
                {subjectSpecialization.specialization.map((subjectDesc) => {
                    return (
                        <div className='flex flex-row items-center space-x-8'>


                            <h4 className=''>{subjectDesc.title}</h4>
                        </div>
                    )
                })}
            </>)
    }
    return (
        <div className='mx-20 my-2 flex flex-col space-y-12'>
            <div className="bg-white shadow-lg rounded-lg px-6 py-6 space-y-12 justify-center">
                <h2 className=" text-3xl font-poppins text-center">Apply as a Coach</h2>
                <div className="flex row justify-center space-x-24">
                    <div className="flex flex-col items-center space-y-12">
                        <div className="h-20 w-20 bg-gray-100 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Choose Subject</h4>
                    </div>
                    <div className="flex flex-col items-center space-y-12">
                        <div className="h-20 w-20 bg-gray-50 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Schedule</h4>
                    </div>
                    <div className="flex flex-col items-center space-y-12">
                        <div className="h-20 w-20 bg-green-100 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Confirmation Details </h4>
                    </div>

                </div>
            </div>
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
            <div className='self-center'>

                <SecondaryButton label='apply' />
            </div>
        </div>
    )
}

