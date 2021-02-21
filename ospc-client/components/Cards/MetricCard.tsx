

export const MetricCard = () => {
    return (
        <div className="bg-blue-200 p-3 px-6 rounded-xl   flex flex-row m-3">
            <div className="bg-blue-400 rounded-full m-1 p-2"><img className="h-12 w-12" src="/icons/lesson.svg" /></div>
            <div className="flex flex-col justify-between m-1 ml-3 items-start">
                <h3 className="font-bold text-xl">83% Lessons Taken</h3>
                <p>Last Taken : Date</p>
            </div>
        </div>
    )
}
