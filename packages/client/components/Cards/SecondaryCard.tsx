import React from 'react'

export const SecondaryCard = (props: SecondaryCardProps) => {
    return (
        <div className="flex flex-row rounded-lg justify-between text-black  bg-blue-200 p-4">
            <div className="flex flex-col mx-2 bg-blue-200 shadow-lg p-3 rounded-lg">
                <h3 className="font-bold text-xl ">Jun 10</h3>
                <p>4:00 PM</p>
            </div>
            <div className="flex flex-col mx-4">
                <h3 className="font-bold text-lg">Subject Name</h3>
                <p>Date</p>
            </div>

        </div>

    )
}

export interface SecondaryCardProps {
    title: string
    subtitle: string
    span?: string
}