

export const PrimaryCard = (props: PrimaryCardProps) => {
    return (
        <div className="shadow-md rounded-lg space-x-6 text-black  bg-blue-200 p-4 my-3">
            {props.children}
        </div>
    )
}


export interface PrimaryCardProps {
    children: any
}