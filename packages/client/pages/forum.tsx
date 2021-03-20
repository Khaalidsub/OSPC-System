import { BadgeCard, BadgeColor, PrimaryCard, PrimaryButton, SelectField, TertiaryCard, SearchField } from 'components'
import { getUser } from 'lib/utils'


export const Forum = () => {
    const Metadata = () => {
        return (
            <div className="flex flex-row space-x-4 text-xs">
                <p className="text-secondary ">0 Answer</p>
                <p>10 days ago</p>
                <p>Sasha Liskov</p>
                <p className="text-information">Programming</p>
            </div>
        )
    }
    const Question = () => {
        return (
            <div className="self-center flex flex-col bg-white rounded-md shadow-md  p-4 space-y-4">
                <h2 className="font-raleway text-2xl" >What is Programming?</h2>
                <p className="font-raleway line-clamp-2 pr-28 font-normal">Est laborum eiusmod quis anim incididunt amet officia eiusmod in adipisicing. Veniam anim exercitation incididunt laboris qui deserunt. Laboris laborum aute ut nostrud excepteur dolor ipsum minim aute amet.</p>
                <Metadata />
            </div>
        )
    }

    const SelectField = () => {
        return (

            <select className="border-none outline-none focus:outline-none bg-transparent">
                <option value="Most Recent">Most Recent</option>
            </select>
        )
    }
    return (
        <div className=" mx-8 lg:mx-44 my-4">
            <div className="flex flex-col space-y-4 ">
                <SearchField />
                <div className=" flex flex-row justify-between px-4 pt-12">
                    <div className="space-x-4 flex flex-row items-center self-end">
                        <h3>36 Question</h3>
                        <button className="px-5 py-2 font-semibold rounded-md shadow-md font-raleway bg-tertiary text-white">Ask Question</button>
                    </div>
                    <div className="space-x-4">
                        <SelectField />
                        <SelectField />
                    </div>


                </div>
                <Question />
                <Question />
                <Question />
                <Question />
                <Question />
            </div>

        </div>

    )
}

export const getServerSideProps = async ({ req, res }) => {

    return getUser({ req })
}
export default Forum