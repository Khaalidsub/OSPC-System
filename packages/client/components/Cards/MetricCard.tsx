

export const MetricCard = ({label,value}) => {
    return (
        <div className="bg-white p-3 h-48 lg:px-2 rounded-xl flex flex-col justify-center text-center m-3 shadow-md">
            <h3 className="font-semibold text-xl">{label}</h3>
            <h4 className="text-lg font-semibold">{value}</h4>
        </div>
    )
}
