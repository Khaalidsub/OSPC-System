import { useQuery } from "@apollo/client"
import { SecondaryButton } from "components/Buttons"
import { SearchField } from "components/InputFields/SearchField"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { profileDefault, subjectAreaDefault } from "utililites/util"
import { SUBJECT_AREAS } from "utilities/schema"
import * as SubjectAreaTypes from "utilities/__generated__/subjectAreas"
interface SubjectAreaProps {
    subjectArea: SubjectAreaTypes.subjectAreas_departments
}
function SubjectAreas() {
    const [search, setSearch] = useState('')
    const { data, fetchMore,refetch } = useQuery<SubjectAreaTypes.subjectAreas>(SUBJECT_AREAS)
    const [areas, setAreas] = useState([] as SubjectAreaTypes.subjectAreas_departments[])

    const router = useRouter()
    const {  isRefetch } = router.query
    useEffect(() => {

        setAreas(data?.departments)
    }, [data])
   
    useEffect(() => {
        if (isRefetch) {
            refetch()
        }
    }, [isRefetch])
    useEffect(() => {
        const result = data?.departments.filter(student => {
            return student.name.toLowerCase().includes(search)
        })
        setAreas(result)
    }, [search])
    const SubjectArea = (props: SubjectAreaProps) => {
        return (
            <div className="flex flex-row bg-white justify-between rounded-lg shadow-md  p-4 space-y-4">
                <div className="flex flex-row w-full space-x-4 items-center">
                    <img className="h-28 w-28 rounded-full" src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${props.subjectArea.image || subjectAreaDefault}`} alt="" />
                    <div className="flex flex-col w-full space-y-3">

                        <div className="flex flex-row justify-between">
                            <h2 onClick={() => router.push(`/admin/areas/subjects/${props.subjectArea.id}?name=${props.subjectArea.name}`)} className="font-raleway text-2xl cursor-pointer hover:underline" >{props.subjectArea.name}</h2>
                            <span onClick={() => router.push(`/admin/areas/update/${props.subjectArea.id}`)} className="cursor-pointer hover:underline text-poppins text-information" >Edit</span>
                        </div>
                        {/* <h4 className="uppercase">{student.student.university}</h4> */}
                        <p className="font-raleway line-clamp-3 ">{props.subjectArea.description}</p>
                        <div className='space-x-4'>
                            <span className="italic font-raleway text-sm">{props.subjectArea.subjects} Subjects</span>
                            <span className='italic font-raleway text-sm'> Moderator : {props.subjectArea.moderator.name}</span>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
    const RenderSubjectAreas = () => {
        return (
            <>
                {areas?.map((department) => {
                    return <SubjectArea key={department.id} subjectArea={department} />
                })}
            </>
        )
    }

    return (
        <div className="grid grid-cols-1">
            <div className="flex flex-col space-y-8 w-3/4 place-self-center">
                <h4 className="text-4xl">List of Subject Areas</h4>
                <div className="grid grid-cols-2">
                    <SearchField placeholder="Search Subject Area" setSearch={setSearch} search={search} />
                    <div className='justify-self-end self-center flex space-x-5'>
                        {/* <SecondaryButton label='Add Moderator' /> */}
                        <SecondaryButton onClick={() => { router.push('/admin/areas/add') }} color={'bg-secondary'} label='Add Subject Area' />
                    </div>
                </div>
                <RenderSubjectAreas />
            </div>

        </div>
    )
}

export default SubjectAreas
