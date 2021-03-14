import React from 'react'
import { MetricCard, SecondaryCard, TertiaryCard } from "components"

export const Dashboard = () => {
    const UpComingLessons = () => {
        return (
            <div className="  flex flex-col">

                <h3 className="text-xl font-semibold">Upcoming Lessons</h3>
                <div className="p-3 rounded-lg space-y-2">
                    <LessonsInfo />
                    <LessonsInfo />
                    <LessonsInfo />



                </div>
            </div>
        )
    }
    const TopForums = () => {
        return (
            <div className=" flex flex-col space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2">

                </div>
                <div className="flex flex-row justify-between px-2">
                    <h3 className="text-xl font-semibold">Top Forums</h3>
                    <button className="rounded-full border p-1 text-xs border-black">Forums</button>
                </div>
                <div className="  rounded-lg space-y-2">
                    <LessonsInfo />
                    <LessonsInfo />
                    <LessonsInfo />

                </div>
            </div>
        )
    }
    const CoachInfo = () => {
        return (
            <div className="flex flex-row rounded-3xl text-black  bg-blue-200 p-4">
                <div className="flex flex-col">
                    <img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3e378252a934e660f231666b51bd269a" className="rounded-full h-12 w-12ml-2 mr-3" />
                </div>
                <div className="flex flex-col mx-4">
                    <h3 className="font-bold text-lg">Subject Name</h3>
                    <p>56 Students</p>
                </div>

            </div>
        )
    }
    const LessonsInfo = () => {
        return (<div className="flex flex-row rounded-3xl text-black  bg-blue-200 p-4">
            <div className="flex flex-col">
                <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-full text-white">F</h3>            </div>
            <div className="flex flex-col mx-4">
                <h3 className="font-bold text-lg">Subject Name</h3>
                <p>56 Students</p>
            </div>

        </div>)
    }
    const TopCoaches = () => {
        return (
            <div className="  flex flex-col space-y-2">
                <div className="flex flex-row justify-between">
                    <h3 className="text-xl font-semibold">Best Coaches</h3>
                    <button className="rounded-full border p-1 text-xs border-black">All Coaches</button>
                </div>
                <div className="rounded-lg space-y-2">
                    <CoachInfo />
                    <CoachInfo />
                    <CoachInfo />


                </div>
            </div>
        )
    }



    const Banner = () => <div className=" bg-yellow-100 grid grid-cols-1 items-center text-center w-2/3 m-4 rounded-3xl shadow-md ">
        <h1 className="text-4xl font-bold text-blue-900">
            Hello world!
        </h1>
    </div>
    return (
        <div className=" md:m-6 lg:m-24 flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between">
                <Banner />
                <UpComingLessons />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-stretch md:space-x-3">

                <TopForums />

                <TopCoaches />
            </div>


        </div>
    )
}

export default Dashboard