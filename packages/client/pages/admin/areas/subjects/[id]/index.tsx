import { useQuery } from "@apollo/client"
import { SecondaryButton } from "components/Buttons"
// import { SecondaryButton } from "components"
import SearchField from "components/InputFields/SearchField"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { SUBJECTS, SUBJECTS_BY_DEPARTMENT } from "utilities/schema"
import * as SubjectsTypes from 'utilities/__generated__/subjectsByDepartment'
interface SubjectProps {
    subject: SubjectsTypes.subjectsByDepartment_subjectsByDepartment
}
function Subjects() {
    const [search, setSearch] = useState('')
    const [subjects, setAreas] = useState([] as SubjectsTypes.subjectsByDepartment_subjectsByDepartment[])

    const router = useRouter()
    const { id, name } = router.query
    const departmentId = (id as string).trim()

    const { data } = useQuery<SubjectsTypes.subjectsByDepartment, SubjectsTypes.subjectsByDepartmentVariables>(SUBJECTS_BY_DEPARTMENT, { variables: { id: departmentId } })
    useEffect(() => {

        setAreas(data?.subjectsByDepartment)
    }, [data])
    useEffect(() => {
        const result = data?.subjectsByDepartment.filter(student => {
            return student.name.toLowerCase().includes(search)
        })
        setAreas(result)
    }, [search])
    const Subject = (props: SubjectProps) => {
        return (
            <div className="flex flex-row bg-white justify-between rounded-lg shadow-md  p-4 space-y-4">
                <div className="flex flex-row w-full space-x-4 items-center">
                    <img className="h-28 w-28 rounded-full" src="/fake_images/CS.jpg" alt="" />
                    <div className=" flex flex-col w-full space-y-3">

                        <div className="flex flex-row justify-between">
                            <h2 className="font-raleway text-2xl" >{props.subject.name}</h2>

                            <span onClick={() => router.push(`/admin/areas/subjects/subject/${props.subject.id}/update`)} className=" cursor-pointer focus:underline text-poppins text-information" >Edit</span>
                        </div>
                        {/* <h4 className="uppercase">{student.student.university}</h4> */}
                        <p className="font-raleway line-clamp-3">{props.subject.description}</p>
                        <div className='space-x-4'>
                            <span className="italic font-raleway text-sm">{props.subject.coaches} Coaches</span>
                            {/* <span className='italic font-raleway text-sm'> Moderator : {props.subjectArea.moderator.name}</span> */}
                        </div>

                    </div>
                </div>

            </div>
        )
    }
    const RenderSubjects = () => {
        return (
            <>
                {subjects?.map((subject) => {
                    return <Subject key={subject.id} subject={subject} />
                })}
            </>
        )
    }

    return (
        <div className="grid grid-cols-1">
            <div className="flex flex-col space-y-8 w-3/4 place-self-center">
                <h4 className="text-4xl">List of Subjects in {name}</h4>
                <div className="grid grid-cols-2">
                    <SearchField placeholder="Search Subject" setSearch={setSearch} search={search} />
                    <div className='justify-self-end self-center flex space-x-5'>
                        {/* <SecondaryButton label='Add Moderator' /> */}
                        <SecondaryButton onClick={() => router.push(`/admin/areas/subjects/${id}/add`)} color={'bg-secondary'} label='Add Subject' />
                    </div>
                </div>
                <RenderSubjects />
            </div>

        </div>
    )
}

export default Subjects
