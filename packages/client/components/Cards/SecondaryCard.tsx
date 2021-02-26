import React from 'react'

export const SecondaryCard = (props: SecondaryCardProps) => {
    return (
        <div className="flex flex-row rounded-lg justify-between text-black  bg-blue-200 p-4 my-3 ">
            <div className="flex flex-col mx-2">
                <h3 className="font-bold text-xl ">Jun 10</h3>
                <p>4:00 PM</p>
            </div>
            <div className="flex flex-col mx-4">
                <h3 className="font-bold text-lg">Subject Name</h3>
                <p>Date</p>
            </div>
            <img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3e378252a934e660f231666b51bd269a" className="rounded-full h-12 w-12ml-2 mr-3" />
        </div>

    )
}

export interface SecondaryCardProps {
    title: string
    subtitle: string
    span?: string
}