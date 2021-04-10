import { useLazyQuery, useQuery } from "@apollo/client"
import { CoachCard, SecondarySelectField, SelectField } from "components"
import SearchField from "components/InputFields/SearchField"
import { withAuth } from "components/withAuth"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { ACTIVE_COACHES, SELECT_SUBJECTS_BY_DEPARTMENT, SELECT_SUBJECT_AREAS } from "utilities/schema"
import { activeCoaches, activeCoachesVariables, activeCoaches_activeCoaches } from 'utilities/__generated__/activeCoaches'
import { selectSubjectAreas, selectSubjectAreas_departments } from 'utilities/__generated__/selectSubjectAreas'
import { selectSubjectsByDepartment, selectSubjectsByDepartmentVariables, selectSubjectsByDepartment_subjectsByDepartment } from 'utilities/__generated__/selectSubjectsByDepartment'
export const Coaches = () => {
    const router = useRouter()
    const [fetchSbjectAreas, { data: subjectAreas }] = useLazyQuery<selectSubjectAreas>(SELECT_SUBJECT_AREAS)
    const [fetchSubjects, { data: subjects }] = useLazyQuery<selectSubjectsByDepartment, selectSubjectsByDepartmentVariables>(SELECT_SUBJECTS_BY_DEPARTMENT)
    const { data: coachData, refetch } = useQuery<activeCoaches, activeCoachesVariables>(ACTIVE_COACHES)
    const [subject, setSubject] = useState({} as selectSubjectsByDepartment_subjectsByDepartment)
    const [department, setDepartment] = useState({} as selectSubjectAreas_departments)
    const [coaches, setCoaches] = useState([] as activeCoaches_activeCoaches[])
    const [search, setSearch] = useState('')
    // const {} = useQuery()
    const CoachList = () => {
        return (<>
            {coaches?.map((coach) => {
                return <CoachCard onClick={(e) => { router.push(`/coaches/coach/${coach.id}`) }} key={coach.id} name={coach.name} specialization={coach.email} />
            })}
        </>)
    }
    useEffect(() => {
        // console.log('hello', subject);

        refetch({ id: subject?.id })
    }, [subject])
    useEffect(() => {
        // console.log('data', coachData);

        setCoaches(coachData?.activeCoaches)
    }, [coachData])

    useEffect(() => {
        const result = coachData?.activeCoaches.filter((coach) => {
            return coach.name.toLowerCase().includes(search)
        })
        setCoaches(result)
    }, [search])
    return (
        <div className="grid grid-cols-1">

            <div className="w-3/4 mx-auto flex flex-col space-y-12 ">
                <div className="w-3/4 mx-auto">


                    <SearchField placeholder='Search Coach' search={search} setSearch={setSearch} />
                </div>
                <div className="space-x-12 mx-auto">
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 gap-x-54">
                    <CoachList />
                </div>
            </div>
        </div>
    )
}
export default withAuth(Coaches)