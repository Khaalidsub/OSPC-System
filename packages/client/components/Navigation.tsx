import React from 'react'
import { NavigationIcon } from './NavigationIcon'

export const Navigation = () => {
    return (
        <div className="bg-primary    text-center p-3 md:w-16 lg:w-64 flex flex-row md:flex-col md:space-y-11 items-center justify-center md:justify-start sticky inset-x-0 bottom-0  md:inset-x-auto md:bottom-auto md:static">
            <h1 className="hidden md:block md:text-md text-white lg:text-xl font-semibold ">OSPC</h1>
            <ul className="hidden   md:flex flex-col justify-between text-base text-white h-full">
                <div className="md:space-y-16">

                    <NavigationIcon label="DashBoard" icon="/assets/dashboard.svg" />
                    <NavigationIcon label="lessons" icon="/assets/lessons.svg" />
                    <NavigationIcon label="coaches" icon="/assets/coach.svg" />
                    <NavigationIcon label="forum" icon="/assets/forum.svg" />
                    <NavigationIcon label="chat" icon="/assets/chat.svg" />
                </div>

                <NavigationIcon label="logout" icon="/assets/logout.svg" />

            </ul>
        </div>
    )
}
