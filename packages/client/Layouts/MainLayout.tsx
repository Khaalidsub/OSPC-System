import React from 'react'
import { Navigation } from 'components'
export default function MainLayout(props: MainLayoutProps) {
    return (
        <div className="min-h-screen  bg-gray-50 ">

            <div className="min-h-screen relative md:static flex flex-col-reverse md:justify-items-stretch md:flex-row">
                <Navigation />
                <div className="container">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export interface MainLayoutProps {
    children: any
}