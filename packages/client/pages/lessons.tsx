import { useLazyQuery, useQuery } from '@apollo/client'
import { SecondarySelectField, SelectField, TertiaryCard } from 'components'
import SearchField from 'components/InputFields/SearchField'
import { withAuth } from 'components/withAuth'
import React, { useEffect, useState } from 'react'
import { selectSubjectAreas, selectSubjectAreas_departments } from 'utililites/__generated__/selectSubjectAreas'
import { selectSubjectsByDepartment, selectSubjectsByDepartmentVariables, selectSubjectsByDepartment_subjectsByDepartment } from 'utililites/__generated__/selectSubjectsByDepartment'
import { COACH_LESSONS, SELECT_SUBJECTS_BY_DEPARTMENT, SELECT_SUBJECT_AREAS } from 'utilities/schema'
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
const LessonOptions = ({ refetch, search, setSearch }) => {
    const [fetchSbjectAreas, { data: subjectAreas }] = useLazyQuery<selectSubjectAreas>(SELECT_SUBJECT_AREAS)
    const [fetchSubjects, { data: subjects }] = useLazyQuery<selectSubjectsByDepartment, selectSubjectsByDepartmentVariables>(SELECT_SUBJECTS_BY_DEPARTMENT)
    const [subject, setSubject] = useState({} as selectSubjectsByDepartment_subjectsByDepartment)
    const [department, setDepartment] = useState({} as selectSubjectAreas_departments)
    useEffect(() => {
        // console.log('hello', subject);
        // console.log('hello in subject');

        refetch({ subject: subject?.id })
    }, [subject])
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 ">
            <SecondarySelectField onChange={() => {

                fetchSbjectAreas()
            }} value={department?.id || 'All'} label="departments" onClick={(e) => {

                const selectedDepartment = subjectAreas.departments.find(s => s.id === e.target.value);
                setDepartment(selectedDepartment)

            }} data={subjectAreas ? subjectAreas?.departments.map(department => { return { value: department.id, label: department.name } }) : []} />
            <SecondarySelectField onChange={() => fetchSubjects({ variables: { id: department?.id } })} value={subject?.id || 'All'} label="subjects" onClick={(e) => {
                const selectedSubject = subjects.subjectsByDepartment.find(s => s.id === e.target.value);
                setSubject(selectedSubject)
            }} data={subjects ? subjects?.subjectsByDepartment.map(subject => { return { value: subject.id, label: subject.name } }) : []} />
            <div className='col-span-2'>

                <SearchField placeholder="search lessons" search={search} setSearch={setSearch} />
            </div>
        </div>
    )
}
export const Lessons = () => {
    console.log('your country is', Intl.DateTimeFormat().resolvedOptions().timeZone);
    const { data: coachLessonsData, refetch } = useQuery<coachLessons>(COACH_LESSONS)
    const [search, setSearch] = useState('')
    const [coachLessons, setCoachLessons] = useState([] as coachLessons_coachLessons[])

    useEffect(() => {
        // console.log('data', coachLessonsData);

        setCoachLessons(coachLessonsData?.coachLessons)
    }, [coachLessonsData])
    useEffect(() => {
        const result = coachLessonsData?.coachLessons?.filter((coach) => {
            return coach.name.toLowerCase().includes(search)
        })
        setCoachLessons(result)
    }, [search])
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
                {coachLessons?.map((coachLesson) => {

                    return <Lesson  {...coachLesson} key={coachLesson.id} />
                })}
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
                <LessonOptions search={search} setSearch={setSearch} refetch={refetch} />
                <LessonList />
            </div>
        </div>
    )
}

export default withAuth(Lessons)