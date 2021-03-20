export const InputField = ({ label, onChange, type, placeholder }: InputFieldProps) => {
    return (
        <div className="">
            <label className="text-sm font-poppins pb-2">{label}</label>
            <input onChange={(e) => onChange(e.target.value)} type={type} placeholder={placeholder} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-coolGray-700 dark:text-coolGray-900" />
        </div>
    )
}
export interface InputFieldProps {
    label: string
    onChange: Function
    type: string
    placeholder: string



}
export default InputField