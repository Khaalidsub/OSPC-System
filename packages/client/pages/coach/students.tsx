import { useQuery } from '@apollo/client'
import { SearchField, SecondarySelectField } from 'components/InputFields'
import { withAuth } from 'components/withAuth'
import React, { useEffect, useState } from 'react'
import { profileDefault } from 'utililites/util'
import { COACH_LESSONS, STUDENT_LESSONS } from 'utilities/schema'
import { studentLessons, studentLessons_studentLessons } from 'utilities/__generated__/studentLessons'
// import { } fr
const MetricCard = () => {
    return (
        <div className="bg-white p-10   rounded-xl flex flex-col justify-center text-center m-3 shadow-md">
            <h3 className="font-semibold text-xl">Learning min</h3>
            <h4 className="text-lg font-semibold">50</h4>
        </div>
    )
}


const LessonOptions = ({search,setSearch}) => {
    return (
        <div className="grid grid-cols-1 w-1/2 mx-auto">


                <SearchField placeholder="search students" search={search} setSearch={setSearch} />
           
        </div>
    )
}
export const Lessons = () => {
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const { data: coachLessonsData } = useQuery<studentLessons>(STUDENT_LESSONS)
    const [search, setSearch] = useState('')
    const [coachLessons, setCoachLessons] = useState([] as studentLessons_studentLessons[])

    useEffect(() => {
        // console.log('data', coachLessonsData);

        setCoachLessons(coachLessonsData?.studentLessons)
    }, [coachLessonsData])
    useEffect(() => {
        const result = coachLessonsData?.studentLessons?.filter((coach) => {
            return coach.name.toLowerCase().includes(search)
        })
        setCoachLessons(result)
    }, [search])

    const LessonList = () => {
        return (
            <div className="flex flex-col space-y-6">
                {coachLessons?.map((coachLesson) => {
    
                    return <Lesson {...coachLesson} key={coachLesson.id} />
                })}
            </div>
    
        )
    }
    const Lesson = ({ email,image, id, name, lessons_given, }: studentLessons_studentLessons) => {
        return (
            <div className="relative flex flex-row bg-white  justify-between rounded-lg shadow-md  p-4 space-y-4">
                <div className="flex flex-row w-full space-x-4 items-center">
    
                    <img className="h-28 w-28 rounded-full" src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image|| profileDefault}`} alt="" />
                    <div className="flex flex-col   space-y-2">
    
                        <div className="flex flex-row justify-between">
    
                            <h2 className="font-poppins text-2xl" >{name}</h2>
                        </div>
    
                        {/* <h4>{subjectSpecialization.specialization.map(special => { return special.title })}</h4> */}
    
                    </div>
                </div>
    
                <div className="flex flex-col w-1/2  justify-between items-center space-y-3 ">
    
                    <h2 className="font-poppins text-xl" >{lessons_given} Lessons</h2>
    
    
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
        // list all students taught
        // how many lessons given
        <div className="grid grid-cols-1 gap-2">
            <div className="w-3/4 place-self-center space-y-4">
                <LessonResults />
                <LessonOptions search={search} setSearch={setSearch} />
                <LessonList  />
            </div>
        </div>
    )
}

export default withAuth(Lessons)