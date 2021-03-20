
export const PrimaryButton = ({ label, onClick }: PrimaryButtonProps) => {
    return (
        <button type="submit" onClick={onClick} className="w-1/2 rounded-lg py-3 font-poppins text-white bg-primary shadow-lg">
            {label}
        </button>
    )
}

export interface PrimaryButtonProps {
    label: string
    onClick?: any
}
export default PrimaryButton