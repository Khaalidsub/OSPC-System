import { useMutation, useQuery } from "@apollo/client"
import { SearchField, SecondaryButton, SelectField } from "components"
import React, { useEffect, useState } from "react"
import { ACCEPT_STUDENT, REJECT_STUDENT, STUDENTS } from "utilities/schema"
import * as StudentTypes from "utilities/__generated__/students"
import { CoachingStatus } from "__generated__/globalTypes"
interface StudentProps {
    student: StudentTypes.students_students
}


export const Students = () => {
    const { data, fetchMore } = useQuery<StudentTypes.students>(STUDENTS)
    const [students, setStudents] = useState([] as StudentTypes.students_students[])
    const [approveStudent,] = useMutation(ACCEPT_STUDENT)
    const [rejectStudent,] = useMutation(REJECT_STUDENT)
    const [resultStudents, setResultStudents] = useState([] as StudentTypes.students_students[])
    const [status, setStatus] = useState(undefined as CoachingStatus)
    const [search, setSearch] = useState('')
    useEffect(() => {
        setStudents(data?.students || [])
        setResultStudents(data?.students)
    }, [data])
    useEffect(() => {
        const result = students.filter(student => {
            return student.name.toLowerCase().includes(search)
        })
        setResultStudents(result)
    }, [search])

    useEffect(() => {

        const result = students.filter(student => {
            if (!status) {
                return true;
            }
            return student.accountStatus === status
        })
        setResultStudents(result)
    }, [status])

    const onRejectStudent = async (id: string) => {
        try {
            await rejectStudent({ variables: { id } })
            await fetchMore({ query: STUDENTS })
        } catch (error) {
            console.log(error);

        }
    }
    const onApproveStudent = async (id: string) => {
        try {
            await approveStudent({ variables: { id } })
            await fetchMore({ query: STUDENTS })
        } catch (error) {
            console.log(error);

        }
    }


    const Student = (student: StudentProps) => {
        let status = 'bg-primary'
        switch (student.student.accountStatus) {
            case CoachingStatus.active:
                status = 'bg-green-200'
                break;
            case CoachingStatus.pending:
                status = 'bg-yellow-200'
                break;
            case CoachingStatus.rejected:
                status = 'bg-red-200'
                break;

            default:
                break;
        }
        return (
            <div className="flex flex-row bg-white  justify-between rounded-lg shadow-md  p-4 space-y-4">
                <div className="flex flex-row space-x-4">

                    <img className="h-28 w-28 rounded-full" src="/fake_images/Rectangle 798.png" alt="" />
                    <div className="flex flex-col justify-between">


                        <h2 className="font-raleway text-2xl" >{student.student.name}</h2>
                        <h4 className="uppercase">{student.student.university}</h4>
                        <h4>{student.student.email}</h4>

                    </div>
                </div>

                <div className="flex flex-col px-6 w-60 space-y-3  justify-between items-end">
                    <div className={`${status} w-24 p-1 rounded-lg text-center`}>
                        <h3 className={`text-xs`} >{student.student.accountStatus}</h3>
                    </div>

                    {student.student.accountStatus === CoachingStatus.pending ? (<div className='space-y-3 w-1/2'><SecondaryButton onClick={() => {
                        onApproveStudent(student.student.id)
                    }} color='bg-secondary' label="Approve" />
                        <SecondaryButton color="bg-red-800" label="Reject" onClick={() => {
                            onRejectStudent(student.student.id)
                        }} /></div>)
                        : <></>}
                </div>

            </div>
        )
    }

    const RenderStudentList = () => {
        return (
            <>
                {resultStudents.map((student) => {
                    return <Student key={student.id} student={student} />
                })}
            </>
        )
    }
    return (
        <div className="grid grid-cols-1" >
            <div className="flex flex-col space-y-8 w-3/5 place-self-center ">
                <h2 className="text-4xl">List of Students Registration Status</h2>
                <div className="grid grid-cols-2">
                    <SearchField placeholder="Search Student name" setSearch={setSearch} search={search} />
                    <div className='justify-self-end self-center'>

                        <SelectField label='Status' value={status} onClick={(e) => {
                            setStatus(e.target.value)
                        }} options={[CoachingStatus.active, CoachingStatus.inactive, CoachingStatus.pending, CoachingStatus.rejected]} />
                    </div>
                </div>
                <RenderStudentList />

            </div>
        </div>
    )
}

export default Students