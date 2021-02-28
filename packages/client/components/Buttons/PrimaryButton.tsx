
export const PrimaryButton = ({ label, onClick }: PrimaryButtonProps) => {
    return (
        <button className="rounded-lg py-2 w-3/12 text-white bg-blue-300 ">
            {label}
        </button>
    )
}

export interface PrimaryButtonProps {
    label: string
    onClick?: Function
}
export default PrimaryButton