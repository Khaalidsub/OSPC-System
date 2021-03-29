import { getUserFromCookie } from 'lib/utils'
import { useRouter } from 'next/router'
import React from 'react'
export const ProfileInfoCard = () => {
    const router = useRouter()


    return (
        <div className="flex flex-row justify-end space-x-6 p-4 items-center bg-white shadow-md">
            <a href="/settings" onClick={() => router.push('/settings')}><img className="h-5 w-5" src="/assets/settings.svg" alt="" /></a>
            <img className="h-5 w-5" src="/assets/notification.svg" alt="" />
            <img src="/fake_images/Rectangle 824.jpg" className="h-9 w-9 rounded-full" alt="" />
        </div>

    )
}
