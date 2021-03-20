import React from 'react'

export const BadgeCard = ({ label, color }: BadgeCardProps) => {
    return (
        <div className={`shadow-md p-1 text-center rounded-full text-white text-xs ${color}`}>
            {label}
        </div>
    )
}

export interface BadgeCardProps {
    label: string
    color: BadgeColor

}

export enum BadgeColor {
    info = 'bg-blue-500',
    new = 'bg-green-500 ',
    star = 'bg-yellow-500 '
}