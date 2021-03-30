import { NavigationIcon } from "components/NavigationIcon"
import { useAuth } from "lib/auth"
import { useRouter } from "next/router"
import React from "react"

export const StudentNavigation = () => {
    const { logout } = useAuth()
    const router = useRouter()
    const handleClick = (e, href) => {
        e.preventDefault()
        router.push(href)
    }
    const handleLogout = (e, href) => {
        e.preventDefault()
        logout()
        router.push(href)
    }
    return (

        <div className="bg-primary    text-center p-3 md:w-16 lg:w-64 flex flex-row md:flex-col md:space-y-11 items-center justify-center md:justify-start sticky inset-x-0 bottom-0  md:top-0 md:bottom-0  max-h-screen">

            <h1 className="hidden md:block md:text-md text-white lg:text-xl font-semibold ">OSPC</h1>
            <ul className=" hidden md:flex flex-col justify-between text-base text-white h-full">
                <div className="md:space-y-16">

                    <NavigationIcon href='/dashboard' onClick={handleClick} label="DashBoard" icon="/assets/dashboard.svg" />
                    <NavigationIcon href='/lessons' onClick={handleClick} label="lessons" icon="/assets/lessons.svg" />
                    <NavigationIcon href='/coaches' onClick={handleClick} label="coaches" icon="/assets/coach.svg" />
                    <NavigationIcon href='/forum' onClick={handleClick} label="forum" icon="/assets/forum.svg" />
                    <NavigationIcon href='/chat' onClick={handleClick} label="chat" icon="/assets/chat.svg" />
                </div>

                <NavigationIcon href='/login' onClick={handleLogout} label="logout" icon="/assets/logout.svg" />

            </ul>
        </div>
    )
}