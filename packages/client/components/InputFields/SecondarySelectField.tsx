import { ISelectFieldValue } from "utilities/util"



export const SecondarySelectField = ({ label, value, data, onClick }: SecondarySelectFieldProps) => {
    const OptionFields = () => {
        return (
            <>
                {data?.map(option => {
                    return (
                        <option key={option.value} className="font-raleway rounded-lg" value={option.value} >{option.label}</option>
                    )
                })}
            </>
        )
    }
    return (
        <>
            <select value={value} onChange={(e) => onClick(e)} className="focus:outline-none focus:border-transparent  font-raleway w-72 font-normal shadow-lg bg-white justify-self-stretch py-3 px-4  border-none rounded-lg pr-6">
                {/* <option value="" defaultValue='All' >All</option> */}
                <OptionFields />
            </select>
        </>
    )
}

export interface SecondarySelectFieldProps {
    label: string
    value?: string
    data: ISelectFieldValue[]
    onClick?: Function

}