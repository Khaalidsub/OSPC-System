import React, { useEffect } from 'react'
import { Navigation } from 'components'
import { ProfileInfoCard } from 'components'
import { getUserFromCookie } from 'lib/utils'
import { useRouter } from 'next/router'
import { CoachingStatus } from '__generated__/globalTypes'
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from 'utililites/schema'
import { currentUser } from 'utililites/__generated__/currentUser'
export function MainLayout(props: MainLayoutProps) {
    const {data:user,loading} = useQuery<currentUser>(CURRENT_USER)
    // useEffect(() => {
        
    // },[user])
    if (loading) {
        return <></>
    }
    const router = useRouter()
    // const user = getUserFromCookie()
    const RenderProfile = () => {
        if (router.pathname === '/' || router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/pending') {
            return <></>
        }
        return (
            <>
                <ProfileInfoCard />
            </>
        )
    }
    const RenderNavigation = ()=>{
        if (router.pathname === '/' || router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/pending') {
            return <></>
        }
        return <Navigation currentUser={user?.currentUser} />
    }
    return (
        <div id='modal' className="min-h-screen relative   bg-gray-50 ">
            <div className=" relative min-h-screen flex flex-col-reverse md:justify-items-stretch md:flex-row">
                <RenderNavigation/>
                <div className="w-full space-y-8">
                    <RenderProfile />
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