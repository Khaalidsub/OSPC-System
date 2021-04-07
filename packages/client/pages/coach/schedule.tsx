import { useMutation, useQuery } from "@apollo/client"
import { SecondaryButton } from "components/Buttons"
import React, { useEffect, useReducer, useState } from "react"
import { ActionType, initialSchedule, ScheduleReducer } from "reducer/schedule"
import { SCHEDULE, UPDATE_SCHEDULE } from "utilities/schema"
import { schedule } from 'utilities/__generated__/schedule'
import { updateSchedule, updateScheduleVariables } from 'utilities/__generated__/updateSchedule'
import { ScheduleInputType } from "__generated__/globalTypes"
export const Schedule = () => {
    const { data } = useQuery<schedule>(SCHEDULE)
    const [updateSchedule] = useMutation<updateSchedule, updateScheduleVariables>(UPDATE_SCHEDULE)
    const [schedule, dispatch] = useReducer(ScheduleReducer, initialSchedule)
    const [isEditable, setIsEditable] = useState(false)
    useEffect(() => {
        // console.log(schedule?.getSchedule);
        // console.log(data, schedule);
        if (data?.getSchedule) {
            data.getSchedule.schedule.map((scheduleValue: ScheduleInputType) => {
                dispatch({ type: ActionType.AddBulk, day: scheduleValue.day, payload: [scheduleValue.time_start, scheduleValue.time_end] })
            })
        }

    }, [data])
    const onScheduleUpdated = async () => {
        try {
            await updateSchedule({ variables: { id: data?.getSchedule.id, updateSchedule: { schedule: schedule } } })
            setIsEditable(false)
        } catch (error) {
            console.log(error);

        }
    }
    const RenderTableBody = () => {

        return (
            <>
                {schedule.map((scheduleValue: ScheduleInputType) => {
                    return (
                        <tr key={scheduleValue.day} >
                            <td className='text-center capitalize'>{scheduleValue.day}</td>
                            <td>
                                <div className='p-3  flex flex-row items-center space-x-2 justify-center'>
                                    {isEditable && <img onClick={() => dispatch({ type: ActionType.RemoveStart, day: scheduleValue.day, payload: scheduleValue.time_start - 1 })} className="cursor-pointer h-3 w-3" src="/assets/left-arrow.svg" alt="" />}
                                    <p>{scheduleValue.time_start}:00</p>
                                    {isEditable && <img onClick={() => dispatch({ type: ActionType.AddStart, day: scheduleValue.day, payload: scheduleValue.time_start + 1 })} className="cursor-pointer h-3 w-3" src="/assets/right-arrow.svg" alt="" />}

                                </div>
                            </td>
                            <td>
                                <div className='p-3  flex flex-row items-center space-x-2 justify-center'>
                                    {isEditable && <img onClick={() => dispatch({ type: ActionType.RemoveEnd, day: scheduleValue.day, payload: scheduleValue.time_end - 1 })} className="cursor-pointer h-3 w-3" src="/assets/left-arrow.svg" alt="" />}
                                    <p>{scheduleValue.time_end}:00</p>
                                    {isEditable && <img onClick={() => dispatch({ type: ActionType.AddEnd, day: scheduleValue.day, payload: scheduleValue.time_end + 1 })} className="cursor-pointer h-3 w-3" src="/assets/right-arrow.svg" alt="" />
                                    }
                                </div>
                            </td>

                        </tr>
                    )
                })}
            </>
        )

    }
    return (
        <div className="grid grid-cols-1">
            <div className="flex flex-col space-y-8 w-3/6 place-self-center">
                <div className="grid grid-cols-1 bg-white py-12 rounded-xl shadow-md space-y-4">
                    <h4 className="text-center text-2xl font-bold font-poppins">Schedule</h4>
                    <hr />
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
                    <div className='w-1/2 justify-self-center flex flex-row space-x-4'>
                        {isEditable ? <>
                            <SecondaryButton onClick={() => { onScheduleUpdated() }} color='bg-yellow-500' label='Update' />
                            <SecondaryButton onClick={() => { setIsEditable(false) }} label='Cancel' />

                        </> : <SecondaryButton onClick={() => { setIsEditable(true) }} label='Edit' />}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Schedule