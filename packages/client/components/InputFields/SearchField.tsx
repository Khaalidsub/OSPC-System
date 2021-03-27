
import React from 'react'

const SearchField = ({ setSearch, search }) => {
    return (
        <div className="bg-white rounded-md shadow-lg flex flex-row items-center space-x-2">
            <img className="h-4 w-4 ml-2" src="/assets/search.svg" alt="" />
            <input onChange={(e) => {
                setSearch(e.target.value)
            }} value={search} className="border border-none rounded w-full placeholder-gray-500 focus:outline-none focus:border-current " type="text" placeholder="Search Student name" />
        </div>
    )
}
export default SearchField