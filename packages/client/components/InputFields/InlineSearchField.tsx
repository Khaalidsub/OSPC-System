import React from 'react'

export const InlineSearchField = ({ setSearch, search, placeholder }) => {
    return (
        <div className="flex flex-row items-center w-full border rounded-lg">
            {/* <img className="h-4 w-4 ml-2" src="/assets/search.svg" alt="" /> */}
            <input onChange={(e) => {
                setSearch(e.target.value)
            }} value={search} className="border border-none rounded w-full placeholder-gray-500 focus:outline-none focus:border-current " type="text" placeholder={placeholder} />
        </div>
    )
}
// export default SearchField