export function Pagination() {
    return (
        <div className="flex justify-end space-x-1 items-center font-raleway">
        <button className="flex items-center justify-center h-8 px-2 text-md font-medium rounded">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>Prev
        </button>
        <button className="flex items-center justify-center w-10 h-10 text-md font-medium rounded bg-green-600 text-white">1</button>

        <button className="flex items-center justify-center h-8 px-2 text-md font-medium rounded">Next
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
        </button>
    </div>
    )
}



