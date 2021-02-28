

export const SelectField = ({ label, options, onClick }: SelectFieldProps) => {
    const OptionFields = () => {
        return (
            <>
                {options.map(option => {
                    return (
                        <option key={option} className="rounded-lg" value={option} >{option}</option>
                    )
                })}
            </>
        )
    }
    return (
        <>
            <select className="justify-self-stretch p-1 rounded-lg pr-6 focus:border-transparent hover:border-transparent">
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