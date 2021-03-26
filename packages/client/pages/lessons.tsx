import { SelectField, TertiaryCard } from 'components'
import { withAuth } from 'components/withAuth'
export const Lessons = () => {
    const LessonList = () => {
        return (
            <div className="grid  grid-cols-1 md:grid-flow-col  md:grid-cols-3 grid-rows-4 gap-x-2 gap-y-3   mx-5 overflow-hidden">
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
                <TertiaryCard title="Question" subtitle="Date">
                    <h3 className="font-bold text-xl  bg-blue-400 p-4 rounded-xl text-white">S</h3>
                </TertiaryCard>
            </div>

        )
    }
    return (
        <div className="md:m-6 lg:m-24 space-y-5 mt-6">
            <h3 className="text-center md:text-left text-4xl font-bold md:mx-8">Lessons</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 mx-8 md:gap-3">
                <SelectField label="blue" options={['chocolate', 'value']} />

            </div>
            <LessonList />
        </div>
    )
}

export default withAuth(Lessons)