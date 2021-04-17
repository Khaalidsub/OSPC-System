
import { useMutation, useQuery } from '@apollo/client'
import { SecondaryButton } from 'components'
import { DisplayError } from 'components/Cards/ErrorCard'
import { endOfDay, endOfWeek, format, startOfDay, startOfWeek } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BOOK_LESSON, COACH } from 'utilities/schema'
import { bookLessonVariables, bookLesson } from 'utilities/__generated__/bookLesson'
import { coach, coachVariables } from 'utilities/__generated__/coach'
import { Day } from '__generated__/globalTypes'

function BookingForm() {

    const router = useRouter()
    const [bookLesson] = useMutation<bookLesson, bookLessonVariables>(BOOK_LESSON)
    const [message, setError] = useState('')

    const { id, day, time, dayTime } = router.query
    const startDay = startOfDay(startOfWeek(Date.now(), { weekStartsOn: 1 }))
    const endDay = endOfDay(endOfWeek(Date.now(), { weekStartsOn: 1 }))
    const epochStart = format(startDay, 'T')
    const epochEnd = format(endDay, 'T')
    const date = format(new Date(Number.parseInt(dayTime as any)), 'MMMMPPP')
    const { data } = useQuery<coach, coachVariables>(COACH, { variables: { id: id as string, dateFrom: Number.parseInt(epochStart), dateTo: Number.parseInt(epochEnd) } })
    useEffect(() => {
        console.log(data, day, time);


    }, [data])
    const onBookLesson = async () => {
        try {

            await bookLesson({ variables: { createLesson: { coach: id as string, date: Number.parseInt(dayTime as any), day: day as Day, time_start: Number.parseInt(time as string), subject: data?.getUserSpecialization.subject.id } } })
            router.replace(`/coaches/coach/${id}?isRefetch=true`)
        } catch (error) {
            setError(error.message);

        }
    }


    return (
        <div className='grid grid-cols-1'>
            <div className='flex felx-col space-y-4 w-2/3 place-self-center bg-white rounded-lg shadow-md'>
                <img src="/assets/booking.jpg" className="w-2/5 object-cover rounded-l-lg" alt="" />
                <div className="grid grid-cols-1 w-full space-y-12 pb-8">
                    <div className="text-center">

                        <h3 className="text-2xl">Booking Confimration</h3>
                        <p className="text-sm">Confirm Your Booking Confirmation</p>
                        {message && <DisplayError message={message} setError={setError} />}
                    </div>
                    {/* <div></div> */}

                    <div className="justify-self-center w-1/4 space-y-2">

                        <label className="text-md font-poppins mb-4 text-center">Coach :</label>
                        <h4 className='text-lg'>{data?.user.name}</h4>
                    </div>
                    <div className="justify-self-center w-1/4 space-y-2">

                        <label className="text-md font-poppins mb-4 text-center">Subject :</label>
                        <h3 className="text-lg">{data?.getUserSpecialization.subject.name}</h3>
                    </div>
                    <div className="justify-self-center w-1/4 space-y-2">

                        <label className="text-md font-poppins mb-4 text-center">Date :</label>
                        <h3 className="text-lg">{date} {time}:00</h3>
                    </div>

                    <div className="justify-self-center text-center w-1/4">

                        <SecondaryButton onClick={() => onBookLesson()} label="Confirm" />
                    </div>
                </div>
            </div>

        </div>
    )
}



export default BookingForm

