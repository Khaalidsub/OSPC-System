import { InformationButton } from 'components/Buttons'

export const CoachCard = () => {
    return (
        <div className="p-2 rounded-md flex flex-row  bg-white shadow-md space-x-3 items-center">
            <img className="h-36 rounded-lg" src="/fake_images/Rectangle 798.png" alt="" />
            <div className="flex flex-col space-y-1 pt-2 overflow-hidden pr-5">
                <div className="flex flex-row justify-between">
                    <h3 className="text-lg font-semibold">Adila Choke</h3>
                    <div className="bg-badgs p-1 rounded-md">
                        <h3 className="text-secondary text-xs" >Top Rated</h3>
                    </div>
                </div>
                <h3 className="text-md italic">specialization</h3>
                <p className=" prose prose-sm line-clamp-1 lg:line-clamp-2 leading-relaxed font-raleway">loremId ad duis enim ad cillum dolor. Voluptate officia incididunt esse irure nulla in tempor officia sit officia. Laboris commodo velit ex esse laboris cupidatat labore voluptate quis commodo deserunt. Ad occaecat consectetur excepteur esse reprehenderit consequat. Mollit ex consectetur magna commodo dolor laborum ipsum esse voluptate nulla minim ullamco.</p>
                <div className="flex flex-row">
                    <InformationButton label="Book" />
                </div>
            </div>
        </div>
    )
}
export default CoachCard