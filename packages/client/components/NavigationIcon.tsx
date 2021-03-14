import React from 'react'


export const NavigationIcon = ({ label, icon }: NavigationIconProps) => {
    return (
        <>
            <li className=" cursor-pointer inline-flex md:space-x-4 md:flex md:flex-row flex-col items-center  m-4  md:h-6 md:w-6 lg:h-auto lg:w-auto"><img className="h-7 w-7 lg:mr-2 text-white" src={icon} /><h2 className="hidden hover:text-tertiary focus:text-secondary  font-medium lg:inline uppercase">{label}</h2></li>
        </>
    )
}
export interface NavigationIconProps {
    icon: string
    label: string
}