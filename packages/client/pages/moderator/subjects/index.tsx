import { useQuery } from "@apollo/client"
import { SecondaryButton } from "components/Buttons"
// import { SecondaryButton } from "components"
import SearchField from "components/InputFields/SearchField"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { DEPARTMENT, SUBJECTS, SUBJECTS_BY_DEPARTMENT, SUBJECTS_BY_MODERATOR } from "utilities/schema"
import * as SubjectsTypes from 'utilities/__generated__/subjectsByModerator'
import * as Department from "utilities/__generated__/department"

interface SubjectProps {
    subject: SubjectsTypes.subjectsByModerator_subjectsByModerator
}
function Subjects() {
    const [search, setSearch] = useState('')
    const [subjects, setAreas] = useState([] as SubjectsTypes.subjectsByModerator_subjectsByModerator[])
    const { data: departmentData } = useQuery<Department.department>(DEPARTMENT)

    const router = useRouter()



    const { data } = useQuery<SubjectsTypes.subjectsByModerator>(SUBJECTS_BY_MODERATOR)
    useEffect(() => {

        setAreas(data?.subjectsByModerator)
    }, [data])
    useEffect(() => {
        const result = data?.subjectsByModerator.filter(student => {
            return student.name.toLowerCase().includes(search)
        })
        setAreas(result)
    }, [search])
    const Subject = (props: SubjectProps) => {
        return (
            <div className="flex flex-row bg-white justify-between rounded-lg shadow-md  p-4 space-y-4">
                <div className="flex flex-row space-x-4 items-center">
                    <img className="h-28 w-28 rounded-full" src="/fake_images/CS.jpg" alt="" />
                    <div className="flex flex-col space-y-3">

                        <div className="flex flex-row justify-between">
                            <h2 className="font-raleway text-2xl" >{props.subject.name}</h2>

                            <span className="cursor-pointer text-poppins text-information" >Edit</span>
                        </div>
                        {/* <h4 className="uppercase">{student.student.university}</h4> */}
                        <p className="font-raleway line-clamp-3">Cillum veniam et pariatur ea proident deserunt quis commodo aliquip amet. Dolor aliqua esse velit quis. Cillum magna cillum sit velit irure ullamco amet Lorem cillum adipisicing. Lorem elit labore ad in.

                        Et duis aliquip pariatur laborum reprehenderit ea eu nisi nulla laborum. Mollit nostrud cillum fugiat reprehenderit sint deserunt magna incididunt ut ad aliquip. Consequat occaecat officia laboris pariatur est laborum tempor irure pariatur id ut laboris. Aliquip qui veniam dolor sint. Pariatur Lorem amet Lorem elit nisi labore et consequat ad deserunt consequat nulla.

Aliquip consectetur velit consectetur esse. Irure in et incididunt est eiusmod occaecat deserunt. Enim occaecat aliqua labore exercitation ea minim. Labore tempor fugiat commodo Lorem amet labore proident elit aliqua qui aliqua amet consectetur nisi. Aute fugiat nisi excepteur nisi anim dolor ea incididunt culpa incididunt deserunt elit in.</p>
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
                <h4 className="text-4xl capitalize">List of Subjects in {departmentData?.departmentByModerator.name}</h4>
                <div className="grid grid-cols-2">
                    <SearchField placeholder="Search Subject" setSearch={setSearch} search={search} />
                    <div className='justify-self-end self-center flex space-x-5'>
                        <SecondaryButton onClick={() => router.push('/moderator/subjects/add')} color={'bg-secondary'} label='Add Subject' />
                    </div>
                </div>
                <RenderSubjects />
            </div>

        </div>
    )
}

export default Subjects
