

export const SelectField = ({ label, options, onClick }: SelectFieldProps) => {
    const OptionFields = () => {
        return (
            <>
                {options.map(option => {
                    return (
                        <option key={option} className="font-raleway rounded-lg" value={option} >{option}</option>
                    )
                })}
            </>
        )
    }
    return (
        <>
            <select className="focus:outline-none font-raleway  w-44 font-normal shadow-lg bg-white justify-self-stretch p-1 px-4  border-none rounded-lg pr-6">
                <OptionFields />
            </select>
        </>
    )
}

export interface SelectFieldProps {
    label: string
    options: string[]
    onClick?: Function

}