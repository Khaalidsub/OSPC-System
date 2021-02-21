import React from 'react'

export const Navigation = () => {
    return (
        <div className="bg-blue-100 text-center p-3 md:w-56 ">
            <h3 className="inline-block md:block text-blue-900 text-xl font-bold">OSPC</h3>
            <ul className="inline text-base font-normal text-blue-800">


                <li className="flex flex-row m-4 md:my-8"><img className="h-7 w-7 mr-2 text-white" src="/icons/home_alt.svg" /><p>Home</p></li>
                <li className="flex flex-row m-4 md:my-8"><img className="h-7 w-7 mr-2" src="/icons/dashboard_alt.svg" /><p>Dashboard</p></li>
                <li className="flex flex-row m-4 md:my-8"><img className="h-7 w-7 mr-2" src="/icons/forum_alt.svg" /><p>Forum</p></li>
                <li className="flex flex-row m-4 md:my-8"><img className="h-7 w-7 mr-2" src="/icons/lesson_alt.svg" /><p>Lessons</p></li>
                <li className="flex flex-row m-4 md:my-8"><img className="h-7 w-7 mr-2" src="/icons/chat_alt.svg" /><p>Chats</p></li>
                <li className="flex flex-row m-4 md:my-8"><img className="h-7 w-7 mr-2" src="/icons/settings_alt.svg" /><p>Settings</p></li>

            </ul>
        </div>
    )
}
