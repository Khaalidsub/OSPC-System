import { useQuery } from '@apollo/client'
import { MetricCard } from 'components/Cards'
import { withAuth } from 'components/withAuth'
import { formatDistance } from 'date-fns'
import React from 'react'
import { MY_LESSONS } from 'utililites/schema'
import { myLessons, myLessonsVariables, myLessons_myLessons } from 'utilities/__generated__/myLessons'
export const Dashboard = () => {
    const { data: myLessons } = useQuery<myLessons, myLessonsVariables>(MY_LESSONS, { variables: { limit: 5 } })
    const UpComingLesson = ({ subject, id, coach, date }: myLessons_myLessons) => {
        return (

            <div className="grid grid-cols-3 bg-white shadow-md rounded-lg p-3 items-center">
                <h2 className="font-bold justify-self-start ">CS</h2>
                <h4 className="font-semibold justify-self-start">{subject.name}</h4>
                <span className="justify-self-end text-center font-raleway font-bold p-1 text-white bg-information rounded-lg px-2">{formatDistance(new Date(date), Date.now(), { addSuffix: true })}</span>
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
    return (
        <div className="grid grid-cols-2 space-x-32 mx-12 my-4">
            <div className="space-y-3">
                <h2 className="text-secondary text-4xl">Welcome..!</h2>
                <h4>What do you want to learn today?</h4>
                <div className="grid grid-cols-2 gap-4">
                    <MetricCard />
                    <MetricCard />
                    <MetricCard />
                    <MetricCard />

                </div>
            </div>
            <div className="flex flex-col space-y-3 ">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <h4>Lessons</h4>
                <div className="flex flex-col space-y-4">

                    <Lessons />
                </div>
            </div>
        </div>
    )
}


export default withAuth(Dashboard)