import React from 'react'
import { SecondaryCard, TertiaryCard } from "components"

export const Dashboard = () => {
    const UpComingLessons = () => {
        return (
            <div className="flex-1  flex flex-col  md:mr-6 lg:mr-24">

                <h3 className="text-2xl font-semibold my-4">Upcoming Lessons</h3>
                <div className="bg-blue-100 p-3 px-6 rounded-lg">
                    <SecondaryCard subtitle="" title="" />
                    <SecondaryCard subtitle="" title="" />
                    <SecondaryCard subtitle="" title="" />
                    <SecondaryCard subtitle="" title="" />
                </div>
            </div>
        )
    }
    const LatestQuestions = () => {
        return (
            <div className=" flex flex-col md:ml-4 lg:ml-24 lg:w-96">

                <h3 className="text-2xl font-semibold my-4 text-center">Latest Questions</h3>
                <div className="bg-blue-100 p-3 px-6 rounded-lg">
                    <TertiaryCard />
                    <TertiaryCard />
                    <TertiaryCard />
                </div>
            </div>
        )
    }
    return (
        <div className="md:m-6 lg:m-24 flex flex-col">
            <h2 className="text-6xl font-extrabold my-4">Welcome Back!</h2>
            <div className="flex md:flex-row flex-col">
                <UpComingLessons />
                <LatestQuestions />
            </div>
        </div>
    )
}

export default Dashboard