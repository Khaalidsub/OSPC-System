import React from 'react'
import { Navigation } from 'components'
import { ProfileInfoCard } from 'components/Cards/ProfileInfoCard'
export default function MainLayout(props: MainLayoutProps) {

    return (
        <div className="min-h-screen  bg-gray-50 ">
            <div className="min-h-screen relative md:static flex flex-col-reverse md:justify-items-stretch md:flex-row">
                <Navigation />
                <div className="container space-y-10">
                    <ProfileInfoCard />
                    {props.children}

                </div>
            </div>
        </div>
    )
}

export interface MainLayoutProps {
    children: any
}