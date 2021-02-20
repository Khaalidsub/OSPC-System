import React from 'react'

export const Navigation = () => {
    return (
        <div className="bg-purple-100 text-center p-3 md:w-40">
            <h3 className="inline-block md:block text-purple-400 text-lg font-bold">OSPC</h3>
            <ul className="inline text-base font-normal text-purple-400">
                <li className="inline-block m-3">Home</li>
                <li className="inline-block m-3">Dashboard</li>
                <li className="inline-block m-3">Forum</li>
                <li className="inline-block m-3">Lessons</li>
                <li className="inline-block m-3">Chats</li>
                <li className="inline-block m-3">Settings</li>
            </ul>
        </div>
    )
}
