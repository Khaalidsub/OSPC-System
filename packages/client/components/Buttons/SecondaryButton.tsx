

export const SecondaryButton = ({ label, onClick, color = 'bg-primary' }: SecondaryButtonProps) => {
    return (
        <button type="submit" onClick={onClick} className={` rounded-lg py-2 px-4 font-raleway text-white ${color} shadow-lg text-sm`}>
            {label}
        </button>
    )
}

export interface SecondaryButtonProps {
    label: string
    color?: string
    onClick?: any
}
export default SecondaryButton