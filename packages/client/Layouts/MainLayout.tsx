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
        if (router.pathname === '/' || router.pathname === '/login' || router.pathname === '/register') {
            return <></>
        }
        return (
            <>
                <ProfileInfoCard />
            </>
        )
    }
    return (
        <div id='modal' className="min-h-screen relative   bg-gray-50 ">
            <div className=" relative min-h-screen flex flex-col-reverse md:justify-items-stretch md:flex-row">
                <Navigation />
                <div className="w-full space-y-8">
                    {<RenderProfile />}
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