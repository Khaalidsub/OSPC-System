import React from 'react'
import { SecondaryCard } from "components"

export const Dashboard = () => {
    const UpComingCourses = () => {
        return (
            <div className="flex flex-col">
                <h3>Upcoming Courses</h3>
                <div>
                    <div className=" flex flex-row rounded-3xl text-white shadow-lg bg-purple-300 p-3 ">
                        <h4 className="bg-purple-500  p-2 rounded-full mx-2 w-10 text-center">S</h4>
                        <div className="flex flex-col">
                            <h3>Subject</h3>
                            <p>Date</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="h-full m-4">
            <UpComingCourses />
        </div>
    )
}

export default Dashboard