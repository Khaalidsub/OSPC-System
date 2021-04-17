import { ISelectFieldValue } from "utilities/util"



export const FormSelectField = ({ label, data, onClick }: SecondarySelectFieldProps) => {
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
            <select onChange={(e) => onClick(e)} className="focus:outline-none focus:border-transparent  font-raleway w-full font-normal bg-white justify-self-stretch py-3 px-4 rounded-lg pr-6">
                <OptionFields />
            </select>
        </>
    )
}
// export default FormSelectField
interface SecondarySelectFieldProps {
    label: string
    data: ISelectFieldValue[]
    onClick?: Function

}