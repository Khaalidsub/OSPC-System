import { getUserFromCookie } from 'lib/utils'
import { useRouter } from 'next/router'
import React from 'react'
import { profileDefault } from 'utililites/util'

export const ProfileInfoCard = ({user}) => {
    const router = useRouter()
    const userImage = user?.image || profileDefault
    
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="space-x-6 p-4 items-center bg-white shadow-md">
            <a href="/settings" onClick={() => router.push('/settings')}><img className="h-5 w-5" src="/assets/settings.svg" alt="" /></a>
            <img className="h-5 w-5" src="/assets/notification.svg" alt="" />
            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${userImage}`} className="h-9 w-9 rounded-full" alt="" />
        </div>

    )
}
