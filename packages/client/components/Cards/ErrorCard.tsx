const DisplayError = ({ setError, message }) => {
    return (
        <div className="bg-red-100 mx-28 space-x-2 items-center border border-red-500 text-red-dark pl-4 pr-8 py-3 rounded flex flex-row" role="alert">
            <span className="">
                <svg className="h-6 w-6 text-red-800 " onClick={() => {
                    setError('')
                }} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
            {/* <strong className="font-bold">Error</strong> */}
            <span className="">{message}</span>
        </div>
    )
}

export default DisplayError