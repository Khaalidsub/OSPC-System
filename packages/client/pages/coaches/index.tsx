import { useQuery } from "@apollo/client"
import { CoachCard, SecondarySelectField, SelectField } from "components"
import { withAuth } from "components/withAuth"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { ACTIVE_COACHES, SELECT_SUBJECTS_BY_DEPARTMENT, SELECT_SUBJECT_AREAS } from "utilities/schema"
import { activeCoaches, activeCoachesVariables, activeCoaches_activeCoaches } from 'utilities/__generated__/activeCoaches'
import { selectSubjectAreas, selectSubjectAreas_departments } from 'utilities/__generated__/selectSubjectAreas'
import { selectSubjectsByDepartment, selectSubjectsByDepartmentVariables, selectSubjectsByDepartment_subjectsByDepartment } from 'utilities/__generated__/selectSubjectsByDepartment'
export const Coaches = () => {
    const router = useRouter()
    const { data: subjectAreas } = useQuery<selectSubjectAreas>(SELECT_SUBJECT_AREAS)
    const { data: subjects, refetch: refetchSubjects } = useQuery<selectSubjectsByDepartment, selectSubjectsByDepartmentVariables>(SELECT_SUBJECTS_BY_DEPARTMENT)
    const { data: coaches, refetch } = useQuery<activeCoaches, activeCoachesVariables>(ACTIVE_COACHES)
    const [subject, setSubject] = useState({} as selectSubjectsByDepartment_subjectsByDepartment)
    const [department, setDepartment] = useState({} as selectSubjectAreas_departments)

    // const {} = useQuery()
    const CoachList = () => {
        return (<>
            {coaches?.activeCoaches.map((coach) => {
                return <CoachCard onClick={(e) => { router.push(`/coaches/coach/${coach.id}`) }} key={coach.id} name={coach.name} specialization={coach.email} />
            })}
        </>)
    }
    useEffect(() => {
        refetchSubjects({ id: department?.id })
    }, [department])

    useEffect(() => {
        // console.log('yo');

        refetch({ id: subject.id })
    }, [subject])

    return (
        <div className="mx-8 lg:mx-16 my-4">

            <div className="flex flex-col space-y-12 items-center">
                {/* <SearchField  /> */}
                <div className="space-x-12">
                    <SecondarySelectField value={department?.id} label="departments" onClick={(e) => {

                        const selectedDepartment = subjectAreas.departments.find(s => s.id === e.target.value);
                        setDepartment(selectedDepartment)

                    }} data={[{ label: 'All', value: 'All' }].concat(subjectAreas ? subjectAreas?.departments.map(department => { return { value: department.id, label: department.name } }) : [])} />
                    <SecondarySelectField value={subject?.id} label="subjects" onClick={(e) => {
                        const selectedSubject = subjects.subjectsByDepartment.find(s => s.id === e.target.value);
                        setSubject(selectedSubject)
                    }} data={[{ label: "All", value: 'All' }].concat(subjects ? subjects?.subjectsByDepartment.map(subject => { return { value: subject.id, label: subject.name } }) : [])} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 gap-x-54">
                    <CoachList />
                </div>
            </div>
        </div>
    )
}
export default withAuth(Coaches)