import React from 'react'
import { NavigationIcon } from './NavigationIcon'

export const Navigation = () => {
    return (
        <div className="bg-blue-100 text-center p-3 md:w-16 lg:w-56 flex flex-row md:flex-col items-center justify-center md:justify-start">
            <h3 className="hidden md:block text-blue-900 text-xl font-bold ">OSPC</h3>
            <ul className="flex flex-row  md:block text-base font-normal text-blue-800">

                <NavigationIcon label="Home" icon="/icons/home.svg" />
                <NavigationIcon label="DashBoard" icon="/icons/dashboard.svg" />
                <NavigationIcon label="Lessons" icon="/icons/lesson.svg" />
                <NavigationIcon label="Forum" icon="/icons/forum.svg" />
                <NavigationIcon label="Chat" icon="/icons/chat.svg" />
                <NavigationIcon label="Settings" icon="/icons/settings.svg" />


            </ul>
        </div>
    )
}
