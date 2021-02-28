
import { BadgeCard, BadgeColor, MetricCard, PrimaryCard, SecondaryCard, SelectField, TertiaryCard } from "components"
import React from "react"


export const Home = () => {

    const PopularCoaches = () => {
        return (<div className="justify-self-end flex flex-col lg:w-96  space-y-6">

            <h3 className="text-2xl font-semibold  text-center">Top Coaches</h3>
            <div className=" p-3 px-6 rounded-lg">

                <TertiaryCard title="Question" subtitle="Date">
                    <img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3e378252a934e660f231666b51bd269a" className="rounded-full h-12 w-12ml-2 mr-3" />
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3e378252a934e660f231666b51bd269a" className="rounded-full h-12 w-12ml-2 mr-3" />
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3e378252a934e660f231666b51bd269a" className="rounded-full h-12 w-12ml-2 mr-3" />
                </TertiaryCard>

            </div>
        </div>)
    }

    const Coaches = () => {
        return (<div className="justify-self-stretch flex  flex-col  space-y-6">
            <div className="grid grid-cols-3 gap-3">
                <SelectField label="" options={['chocolate', 'value']} />
                <SelectField label="" options={['chocolate', 'value']} />
            </div>
            <PrimaryCard >
                <CoachContent />
            </PrimaryCard>
            <PrimaryCard >
                <CoachContent />
            </PrimaryCard>
            <PrimaryCard >
                <CoachContent />
            </PrimaryCard>
        </div>)
    }

    const CoachContent = () => {
        return (
            <div className="grid grid-cols-6">
                <img src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3e378252a934e660f231666b51bd269a" className="self-center rounded-full h-12 w-12 ml-2" />
                <div className="col-span-2 justify-self-start flex flex-col space-y-4">
                    <h3 className="text-lg font-semibold">Darrin</h3>
                    <p className="text-base font-normal">Coach Description</p>
                </div>
                <div className="col-start-6 self-center justify-self-end flex flex-col space-y-2 ">
                    <BadgeCard label="53 students" color={BadgeColor.info} />
                    <BadgeCard label="new" color={BadgeColor.new} />

                </div>
            </div>
        )
    }

    return (
        <div className="md:m-6 lg:m-24 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 space-y-12 mx-12 md:mx-0 md:space-y-0 md:space-x-28">
                <Coaches />
                <PopularCoaches />
            </div>
        </div>
    )
}


export default Home