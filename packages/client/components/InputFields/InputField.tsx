export const InputField = ({ label, onChange, type, placeholder, name, ...props }: any) => {
    return (
        <div className="">
            <label className="text-sm font-poppins pb-2">{label}</label>
            <input {...props} name={name} type={type} placeholder={placeholder} className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
        </div>
    )
}
export interface InputFieldProps {
    label: string
    onChange: Function
    type: string
    placeholder: string
    name?: string


}
// export default InputField