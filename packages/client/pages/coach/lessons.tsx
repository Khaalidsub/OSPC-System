import { useQuery } from '@apollo/client'
import { SearchField, SecondarySelectField } from 'components/InputFields'
import { withAuth } from 'components/withAuth'
import React from 'react'
import { COACH_LESSONS } from 'utilities/schema'
import { coachLessons, coachLessons_coachLessons } from 'utilities/__generated__/coachLessons'
// import { } fr
const MetricCard = () => {
    return (
        <div className="bg-white p-10   rounded-xl flex flex-col justify-center text-center m-3 shadow-md">
            <h3 className="font-semibold text-xl">Learning min</h3>
            <h4 className="text-lg font-semibold">50</h4>
        </div>
    )
}
export const Lessons = () => {
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const { data: coachLessons } = useQuery<coachLessons>(COACH_LESSONS)
    const Lesson = ({ email, id, name, lessons_taken, subjectSpecialization }: coachLessons_coachLessons) => {
        return (
            <div className="relative flex flex-row bg-white  justify-between rounded-lg shadow-md  p-4 space-y-4">
                <div className="flex flex-row w-full space-x-4 items-center">

                    <img className="h-28 w-28 rounded-full" src="/fake_images/fake_user.png" alt="" />
                    <div className="flex flex-col   space-y-2">

                        <div className="flex flex-row justify-between">

                            <h2 className="font-poppins text-2xl" >{name}</h2>
                        </div>

                        <h4>{subjectSpecialization.specialization.map(special => { return special.title })}</h4>

                    </div>
                </div>

                <div className="flex flex-col w-1/2  justify-between items-center space-y-3 ">

                    <h2 className="font-poppins text-xl" >{lessons_taken} Lessons</h2>


                </div>

            </div>
        )
    }
    const LessonList = () => {
        return (
            <div className="flex flex-col space-y-6">
                {coachLessons?.coachLessons.map((coachLesson) => {

                    return <Lesson {...coachLesson} key={coachLesson.id} />
                })}
            </div>

        )
    }
    const LessonOptions = () => {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 ">
                <SecondarySelectField label="" data={[]} />
                <SecondarySelectField label="" data={[]} />
                <div className='col-span-2'>

                    <SearchField placeholder="search lessons" search={''} setSearch={() => { }} />
                </div>
            </div>
        )
    }
    const LessonResults = () => {
        return (
            <div className="flex flex-row justify-center">
                <MetricCard />
                <MetricCard />
                <MetricCard />
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 gap-2">
            <div className="w-3/4 place-self-center space-y-4">
                <LessonResults />
                <LessonOptions />
                <LessonList />
            </div>
        </div>
    )
}

export default withAuth(Lessons)