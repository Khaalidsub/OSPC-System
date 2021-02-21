import React from 'react'


export const NavigationIcon = ({ label, icon }: NavigationIconProps) => {
    return (
        <>
            <li className="inline-flex md:flex md:flex-row flex-col items-center  m-4  md:h-6 md:w-6 lg:h-auto lg:w-auto md:my-14"><img className="h-7 w-7 lg:mr-2 text-white" src={icon} /><p className="hidden lg:inline">{label}</p></li>
        </>
    )
}
export interface NavigationIconProps {
    icon: string
    label: string
}