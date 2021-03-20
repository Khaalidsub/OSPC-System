

export const TertiaryCard = ({ title, subtitle, children }: TertiaryCardProps) => {
    return (

        <div className="flex flex-row rounded-lg text-black  bg-blue-200 p-3">
            <div className="flex mx-2 items-center">
                {children}

            </div>
            <div className="flex flex-col mx-4 content-center text-center">
                <h3 className="flex-wrap font-bold text-lg">{title}</h3>
                <p>{subtitle}</p>
            </div>
        </div>



    )
}

export interface TertiaryCardProps {
    children: any
    title: string
    subtitle: string
}
