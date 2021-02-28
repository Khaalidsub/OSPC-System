import { BadgeCard, BadgeColor, PrimaryCard, PrimaryButton, SelectField, TertiaryCard } from 'components'


export const Forum = () => {
    const Questions = () => {
        return (<div className="mx-5 md:col-span-2 justify-self-stretch flex flex-col space-y-12">
            <div className="flex flex-row justify-between">
                <h3 className="text-center md:text-left text-4xl font-bold ">Forum</h3>

                <PrimaryButton label="Ask Question" />
            </div>
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-3  md:gap-2">
                    <SelectField label="blue" options={['chocolate', 'value']} />
                    <div className="hidden md:grid grid-cols-3 col-start-3 place-content-end">
                        <h3 className="text-xs">Replies</h3>
                        <h3 className="text-xs">Views</h3>
                        <h3 className="text-xs">Answered</h3>
                    </div>

                </div>
                <PrimaryCard >
                    <QuestionContent />
                </PrimaryCard>
                <PrimaryCard >
                    <QuestionContent />
                </PrimaryCard>
                <PrimaryCard >
                    <QuestionContent />
                </PrimaryCard>
                <PrimaryCard >
                    <QuestionContent />
                </PrimaryCard>
            </div>
        </div>
        )
    }
    const QuestionContent = () => {
        return (

            <div className="justify-self-stretch   grid grid-cols-6 gap-3">
                <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-3xl text-white text-center">S</h3>
                <div className="col-start-2 col-end-4 flex flex-col space-y-4">
                    <h3 className="text-lg font-semibold">Question</h3>
                    <div className="flex flex-row space-x-4">
                        <p className="text-base font-normal">Subject</p>
                        <p>Date</p>
                    </div>

                </div>
                <div className="col-start-5 col-span-2 hidden  md:grid grid-cols-3 place-content-center">
                    <h3 className="text-md text-blue-900 col-start-1 text-center">1</h3>
                    <h3 className="text-md text-blue-900 col-start-2 text-center">54</h3>
                    <h3 className="text-md text-blue-900 col-start-3 text-center">30</h3>

                </div>
            </div>
        )
    }
    const SidePanel = () => {
        return (
            <div className="hidden md:flex flex-col justify-self-stretch  space-y-6 ">

                <h3 className="text-2xl font-semibold  text-center">Top Students</h3>

                <div className=" p-3 px-6 rounded-lg space-y-4">

                    <TertiaryCard title="Student" subtitle="">
                        <img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3e378252a934e660f231666b51bd269a" className="rounded-full h-12 w-12ml-2 mr-3" />
                    </TertiaryCard>
                    <TertiaryCard title="Student" subtitle="">
                        <img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3e378252a934e660f231666b51bd269a" className="rounded-full h-12 w-12ml-2 mr-3" />
                    </TertiaryCard>
                    <TertiaryCard title="Student" subtitle="">
                        <img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3e378252a934e660f231666b51bd269a" className="rounded-full h-12 w-12ml-2 mr-3" />
                    </TertiaryCard>
                    <TertiaryCard title="Student" subtitle="">
                        <img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3e378252a934e660f231666b51bd269a" className="rounded-full h-12 w-12ml-2 mr-3" />
                    </TertiaryCard>


                </div>
            </div>
        )
    }
    return (
        <div className="md:m-6 lg:m-24 space-y-5 mt-6">


            <div className="grid grid-cols-1 md:grid-cols-3">
                <Questions />
                <SidePanel />
            </div>

        </div>
    )
}

export default Forum