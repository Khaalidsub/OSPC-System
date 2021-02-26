

export const MetricCard = () => {
    return (
        <div className="bg-blue-200 p-3 lg:px-6 rounded-xl flex-col   flex md:flex-row m-3">
            <div className="bg-blue-400 rounded-lg m-1 p-2 flex flex-row justify-center"><img className="object-contain object-center h-10 w-10 lg:h-12 lg:w-12" src="/icons/lesson.svg" /></div>
            <div className="flex flex-col justify-between m-1 ml-3 items-start">
                <h3 className="font-bold text-md md:text-xl">40 Lessons Taken</h3>
                <p>Last Taken : Date</p>
            </div>
        </div>
    )
}
