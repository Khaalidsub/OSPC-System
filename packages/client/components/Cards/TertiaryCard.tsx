

export const TertiaryCard = () => {
    return (

        <div className="flex flex-row rounded-lg text-black  bg-blue-200 p-3 my-4 ">
            <div className="flex mx-2 items-center">
                <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>

            </div>
            <div className="flex flex-col mx-4 content-center text-center">
                <h3 className="flex-wrap font-bold text-lg">Question</h3>
                <p>Date</p>
            </div>
        </div>



    )
}
