
import React from 'react'

export const SearchField = () => {
    return (


        <div className="lg:w-full xl:w-1/2 w-2/4 md:w-full bg-white rounded-md shadow-lg flex flex-row items-center space-x-2">
            <img className="h-4 w-4 mx-3" src="/assets/search.svg" alt="" />
            <input className="border border-none rounded w-full placeholder-gray-500 focus:outline-none focus:border-transparent  " type="text" placeholder="Search Coaches" />
        </div>
    )
}
export default SearchField