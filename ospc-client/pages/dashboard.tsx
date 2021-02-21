import React from 'react'
import { SecondaryCard } from "components"

export const Dashboard = () => {
    const UpComingCourses = () => {
        return (
            <div className="flex flex-col">

                <h3 className="text-2xl font-semibold my-4">Upcoming Lessons</h3>
                <div className="bg-blue-100 p-3 rounded-lg">
                    <SecondaryCard subtitle="" title="" />
                    <SecondaryCard subtitle="" title="" />
                    <SecondaryCard subtitle="" title="" />
                    <SecondaryCard subtitle="" title="" />
                </div>
            </div>
        )
    }
    return (
        <div className=" m-8 flex flex-col">
            <h2 className="text-6xl font-extrabold my-4">Welcome Back!</h2>
            <div className="flex flex-row">
                <UpComingCourses />
            </div>
        </div>
    )
}

export default Dashboard