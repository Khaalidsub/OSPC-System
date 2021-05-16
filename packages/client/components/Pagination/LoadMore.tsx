export function LoadMore({ hasNextPage, setPage, page }) {
    return (
        <>
            {hasNextPage && (
                <div onClick={() => { setPage(page + 1) }} className='justify-center flex flex-row items-center space-x-3 mx-auto hover:underline cursor-pointer py-7'>

                    <img className='cursor-pointer h-6 w-6 self-end' src="/assets/down-arrow.svg" alt="" />
                    <h3 className='font-normal text-2xl text-secondary '>load more</h3>

                </div>)}
        </>
    )
}

