import { MetricCard } from 'components/Cards'
import React from 'react'

export const Dashboard = () => {
    const UpComingLessons = () => {
        return (

            <div className="grid grid-cols-3 bg-white shadow-md rounded-lg p-3 items-center">
                <h2 className="font-bold justify-self-start ">CS</h2>
                <h4 className="font-semibold justify-self-start">Computer Science</h4>
                <span className="justify-self-end text-center font-raleway font-bold p-1 text-white bg-information rounded-lg px-2">3 days left</span>
            </div>

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
                <h4>Coming Lessons</h4>
                <div className="flex flex-col space-y-4">

                    <UpComingLessons />
                    <UpComingLessons />
                    <UpComingLessons />
                </div>
            </div>
        </div>
    )
}

export default Dashboard