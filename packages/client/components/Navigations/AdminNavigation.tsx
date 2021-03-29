
import { NavigationIcon } from "components/NavigationIcon"
import { useAuth } from "lib/auth"
import { useRouter } from "next/router"
import React from "react"

export const AdminNavigation = () => {
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
        <div className="bg-primary    text-center p-3 md:w-16 lg:w-64 flex flex-row md:flex-col md:space-y-11 items-center justify-center md:justify-start sticky inset-x-0 bottom-0  md:inset-x-auto md:bottom-auto md:static">
            <h1 className="hidden md:block md:text-md text-white lg:text-xl font-semibold ">OSPC</h1>
            <ul className="hidden   md:flex flex-col justify-between text-base text-white h-full">
                <div className="md:space-y-16">

                    <NavigationIcon href='/dashboard' onClick={handleClick} label="DashBoard" icon="/assets/dashboard.svg" />
                    <NavigationIcon href='/lessons' onClick={handleClick} label="lessons" icon="/assets/lessons.svg" />
                    {/* <NavigationIcon href='/coaches' onClick={handleClick} label="coaches" icon="/assets/coach.svg" /> */}
                    <NavigationIcon href='/forum' onClick={handleClick} label="forum" icon="/assets/forum.svg" />
                    <NavigationIcon href='/chat' onClick={handleClick} label="chat" icon="/assets/chat.svg" />
                    <NavigationIcon href='/admin/students' onClick={handleClick} label="students" icon="/assets/chat.svg" />
                    <NavigationIcon href='/admin/coaches' onClick={handleClick} label="coaches" icon="/assets/chat.svg" />
                    <NavigationIcon href='/admin/areas' onClick={handleClick} label="areas" icon="/assets/chat.svg" />
                    <NavigationIcon href='/admin/subjects' onClick={handleClick} label="subjects" icon="/assets/chat.svg" />

                    <NavigationIcon href='/' onClick={handleLogout} label="logout" icon="/assets/logout.svg" />
                </div>

            </ul>
        </div>
    )
}