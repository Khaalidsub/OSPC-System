import React from 'react'
interface InformationButtonProps {
    label: string
}
export const InformationButton = ({ label }: InformationButtonProps) => {
    return (
        <div className="cursor-pointer px-3 py-1 bg-information font-raleway text-sm font-light text-white rounded-md ">
            {label}
        </div>
    )
}
// export default InformationButton