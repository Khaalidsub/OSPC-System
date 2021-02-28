import React from 'react'
import { MetricCard, SecondaryCard, TertiaryCard } from "components"

export const Dashboard = () => {
    const UpComingLessons = () => {
        return (
            <div className="  flex flex-col  lg:w-5/12 space-y-6">

                <h3 className="text-2xl font-semibold">Upcoming Lessons</h3>
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
            <div className=" flex flex-col lg:w-96  space-y-6">

                <h3 className="text-2xl font-semibold  text-center">Latest Questions</h3>
                <div className="bg-blue-100 p-3 px-6 rounded-lg">
                    <TertiaryCard title="Question" subtitle="Date">
                        <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                    </TertiaryCard>
                    <TertiaryCard title="Question" subtitle="Date">
                        <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                    </TertiaryCard>
                    <TertiaryCard title="Question" subtitle="Date">
                        <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                    </TertiaryCard>

                </div>
            </div>
        )
    }


    const Metrics = () => {
        return (<div className="flex flex-row justify-evenly ">
            <MetricCard />
            <MetricCard />
            <MetricCard />
        </div>)
    }
    return (
        <div className="md:m-6 lg:m-24 flex flex-col space-y-6">
            <h2 className="text-6xl font-extrabold  text-center md:text-left">Welcome Back!</h2>
            <div className="flex md:flex-row md:justify-between flex-col space-y-12 mx-12 md:mx-0 md:space-y-0 md:space-x-28">
                <UpComingLessons />

                <LatestQuestions />
            </div>
            <Metrics />

        </div>
    )
}

export default Dashboard