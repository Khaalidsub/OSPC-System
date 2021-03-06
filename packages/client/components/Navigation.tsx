import React from 'react'
import { NavigationIcon } from './NavigationIcon'

export const Navigation = () => {
    return (
        <div className="rounded-t-3xl md:rounded-none text-center p-3 md:w-16 lg:w-56 flex flex-row md:flex-col items-center justify-center md:justify-start sticky inset-x-0 bottom-0  md:inset-x-auto md:bottom-auto md:static">
            <h3 className="hidden md:block text-gray-900 text-xl font-bold ">OSPC</h3>
            <ul className="hidden   md:block text-base font-thin text-gray-700 md:space-y-16">
                <NavigationIcon label="DashBoard" icon="/icons/dashboard_alt.svg" />

                <NavigationIcon label="Home" icon="/icons/home_alt.svg" />
                <NavigationIcon label="Lessons" icon="/icons/lesson_alt.svg" />


            </ul>
        </div>
    )
}
