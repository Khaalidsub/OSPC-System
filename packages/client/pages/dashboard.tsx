import { useQuery } from '@apollo/client'
import { MetricCard } from 'components/Cards'
import { withAuth } from 'components/withAuth'
import { formatDistance } from 'date-fns'
import React from 'react'
import { MY_LESSONS, STUDENT_METRIC } from 'utililites/schema'
import { profileDefault } from 'utililites/util'
import { myLessons, myLessonsVariables, myLessons_myLessons } from 'utilities/__generated__/myLessons'
import { studentMetrics,studentMetrics_studentMetrics } from 'utilities/__generated__/studentMetrics'
export const Dashboard = () => {
    const { data: myLessons } = useQuery<myLessons, myLessonsVariables>(MY_LESSONS, { variables: { limit: 5 } })
    const { data: lesson_metrics } = useQuery<studentMetrics>(STUDENT_METRIC)
    const UpComingLesson = ({ subject, id, coach, date }: myLessons_myLessons) => {
        return (

            <div className="w-full flex flex-row space-x-14 bg-white shadow-md rounded-lg p-3 py-5 items-center">

                <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${coach.image || profileDefault}`} className="h-9 w-9 rounded-full" alt="" />
                <h2 className="font-bold ">{coach.name}</h2>
                <h4 className="font-semibold ">{subject.name}</h4>
                <span className="justify-self-end  font-raleway font-bold p-1 text-white bg-information rounded-lg px-2">{formatDistance(new Date(date), Date.now(), { addSuffix: true })}</span>
            </div>

        )
    }
    const Lessons = () => {
        return (
            <>
                {myLessons?.myLessons.map(lesson => {
                    return <UpComingLesson key={lesson.id} {...lesson} />
                })}
            </>
        )
    }
    const {answers=0,lessons=0,questions=0} = lesson_metrics?.studentMetrics ||{}
    return (
       
        <div className="grid grid-cols-2 space-x-32 mx-12 my-4">
            <div className="space-y-3">
                <h2 className="text-secondary text-4xl">Welcome..!</h2>
                <h4>What do you want to learn today?</h4>
                <div className="grid grid-cols-2 gap-4">
                    <MetricCard label='learning min' value={lessons *60} />
                    <MetricCard  label="Questions Answered" value={answers}/>
                    <MetricCard label="Questions asked" value={questions}/>


                </div>
            </div>
            <div className="flex flex-col space-y-3 ">

                <h4 className="text-primary text-3xl font-poppins mt-7">Lessons</h4>
                <div className="flex flex-col space-y-8 w-3/4  items-end">

                    <Lessons />
                </div>


            </div>
        </div>
    )
}


export default withAuth(Dashboard)