import { ISelectFieldValue } from "utilities/util"



export const SecondarySelectField = ({ label, data, onClick }: SecondarySelectFieldProps) => {
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
            <select onChange={(e) => onClick(e)} className="focus:outline-none focus:border-transparent  font-raleway w-72 font-normal shadow-lg bg-white justify-self-stretch py-3 px-4  border-none rounded-lg pr-6">
                <OptionFields />
            </select>
        </>
    )
}

export interface SecondarySelectFieldProps {
    label: string
    data: ISelectFieldValue[]
    onClick?: Function

}