import React from 'react'
import { Navigation } from 'components'
import { ProfileInfoCard } from 'components'
import { getUserFromCookie } from 'lib/utils'
import { useRouter } from 'next/router'
import { CoachingStatus } from '__generated__/globalTypes'
export default function MainLayout(props: MainLayoutProps) {

    const router = useRouter()
    const user = getUserFromCookie()
    const RenderProfile = () => {
        return (
            <>
                {user ? user.coachingStatus === CoachingStatus.active && <ProfileInfoCard /> : <></>}
            </>
        )
    }
    return (
        <div id='modal' className="min-h-screen   bg-gray-50 ">
            <div className="min-h-screen relative md:static flex flex-col-reverse md:justify-items-stretch md:flex-row">
                <Navigation />
                <div className="w-full space-y-10">
                    {user && <ProfileInfoCard />}
                    {/* <RenderProfile /> */}
                    {props.children}

                </div>
            </div>
        </div>
    )
}

export interface MainLayoutProps {
    children: any
}