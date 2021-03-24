


export const SecondarySelectField = ({ label, options, onClick }: SecondarySelectFieldProps) => {
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
            <select className="focus:outline-none focus:border-transparent  font-raleway w-72 font-normal shadow-lg bg-white justify-self-stretch py-3 px-4  border-none rounded-lg pr-6">
                <OptionFields />
            </select>
        </>
    )
}

export interface SecondarySelectFieldProps {
    label: string
    options: string[]
    onClick?: Function

}