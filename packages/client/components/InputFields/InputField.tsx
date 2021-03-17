export const InputField = ({ label }: InputFieldProps) => {
    return (
        <div className="">
            <label className="text-sm font-poppins pb-2">{label}</label>
            <input id="firstname" type="text" placeholder={label} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-coolGray-700 dark:text-coolGray-900" />
        </div>
    )
}
export interface InputFieldProps {
    label: string

}
export default InputField