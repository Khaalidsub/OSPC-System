import { useContext, useReducer } from "react"
import { ScheduleReducer, initialSchedule, ActionType } from "reducer/schedule"
import { ScheduleInputType } from "__generated__/globalTypes"
import { ApplicationContext, FormSlide } from "./applicationContext"

export const Schedule = () => {
    const { weeklySchedule, setWeeklySchedule, setSlide } = useContext(ApplicationContext)
    const [schedule, dispatch] = useReducer(ScheduleReducer, weeklySchedule.schedule || initialSchedule)
    const onSubmitWeeklySchedule = (e: any) => {
        e.preventDefault()
        setWeeklySchedule({ schedule: schedule })
        setSlide(FormSlide.confirmation)
    }


    const RenderTableBody = () => {

        return (
            <>
                {schedule.map((scheduleValue: ScheduleInputType) => {
                    return (
                        <tr>
                            <td className='text-center capitalize'>{scheduleValue.day}</td>
                            <td>
                                <div className='p-3  flex flex-row items-center space-x-2 justify-center'>
                                    <img onClick={() => dispatch({ type: ActionType.RemoveStart, day: scheduleValue.day, payload: scheduleValue.time_start - 1 })} className="cursor-pointer h-3 w-3" src="/assets/left-arrow.svg" alt="" />
                                    <p>{scheduleValue.time_start}:00</p>
                                    <img onClick={() => dispatch({ type: ActionType.AddStart, day: scheduleValue.day, payload: scheduleValue.time_start + 1 })} className="cursor-pointer h-3 w-3" src="/assets/right-arrow.svg" alt="" />

                                </div>
                            </td>
                            <td>
                                <div className='p-3  flex flex-row items-center space-x-2 justify-center'>
                                    <img onClick={() => dispatch({ type: ActionType.RemoveEnd, day: scheduleValue.day, payload: scheduleValue.time_end - 1 })} className="cursor-pointer h-3 w-3" src="/assets/left-arrow.svg" alt="" />
                                    <p>{scheduleValue.time_end}:00</p>
                                    <img onClick={() => dispatch({ type: ActionType.AddEnd, day: scheduleValue.day, payload: scheduleValue.time_end + 1 })} className="cursor-pointer h-3 w-3" src="/assets/right-arrow.svg" alt="" />

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
            <button type="submit" onClick={onSubmitWeeklySchedule} className={` w-40 rounded-lg py-2 px-4 font-raleway text-white bg-secondary shadow-lg font-semibold text-xl`}>
                {label}
            </button>
        )
    }
    return (
        <>
            <div className=' flex flex-col items-center space-y-8'>

                <h3 className="text-center text-3xl font-semibold">Setup your Schedule</h3>
                <table className="w-full table-fixed">
                    <thead className='font-poppins'>
                        <tr>
                            <th className='w-2/6' >Day</th>
                            <th className='w-4/12'>Starting Time</th>
                            <th className='w-4/12'>Ending Time</th>

                        </tr>
                    </thead>
                    <tbody className='font-raleway'>
                        <RenderTableBody />
                    </tbody>

                </table>
                <SecondaryButton label='next' />
            </div>
        </>
    )
}