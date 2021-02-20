import React from 'react'
import Navigation from '../components/Navigation'

export default function MainLayout(props: MainLayoutProps) {
    return (
        <div className="h-full bg-purple-50 ">
            <div className="h-full  flex flex-col md:justify-items-stretch md:flex-row ">
                <Navigation />
                {props.children}
            </div>

        </div>
    )
}

export interface MainLayoutProps {
    children: any
}