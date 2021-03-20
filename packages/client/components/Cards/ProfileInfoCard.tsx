import { getUserFromCookie } from 'lib/utils'
import React from 'react'

export const ProfileInfoCard = () => {

    const user = getUserFromCookie()
    if (!user) {
        return <></>
    }
    return (
        <div className="h-16 w-full flex flex-row justify-end space-x-8 p-4">
            <img className="h-7 w-7" src="/assets/settings.svg" alt="" />
            <img className="h-7 w-7" src="/assets/notification.svg" alt="" />
            {/* <img src="/fake_images/" alt=""/> */}
        </div>

    )
}
