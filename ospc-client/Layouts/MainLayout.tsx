import React from 'react'
import { Navigation } from 'components'

export default function MainLayout(props: MainLayoutProps) {
    return (
        <div className="  bg-blue-50 ">
            <div className="3xl:h-screen relative md:static flex flex-col-reverse md:justify-items-stretch md:flex-row ">
                <Navigation />
                <div className="w-full">
                    {props.children}
                </div>
            </div>

        </div>
    )
}

export interface MainLayoutProps {
    children: any
}