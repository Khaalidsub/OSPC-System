import { useQuery } from "@apollo/client"
import { useModal } from "hooks/useModal"
import React, { useContext, useState, useEffect, useMemo } from "react"
import { APPLY_COACH_SUBJECTS } from "utilities/schema"
import { ISelectFieldValue } from "utilities/util"
import { CreateSubjectDescription } from "__generated__/globalTypes"
import { ApplicationContext, FormSlide } from "./applicationContext"
import * as SubjectsTypes from "utilities/__generated__/subjects"
import { SubjectSpecModal } from "."
import { SecondarySelectField } from "components/InputFields"
export const SubjectChosen = () => {

    const { openModal, closeModal, isOpen, Modal } = useModal()
    const { subject, setSubject, setSubjectSpecialization, subjectSpecialization, setSlide, slide } = useContext(ApplicationContext)
    // const [subjectDescriptions, setSubjectDescriptions] = useState(subjectSpecialization.specialization)
    const { data, loading, error } = useQuery<SubjectsTypes.subjects>(APPLY_COACH_SUBJECTS)
    const [subjects, setSubjects] = useState([] as SubjectsTypes.subjects_subjects[])
    // useMemo(() => {
    //     setSubjects(data?.subjects)
    // }, [data])
    // useEffect(() => {
    //     // console.log('subjects', subjects, subject);
    //     setSubject(subjects)
    // }, [subjects])

    useEffect(() => {
        setSubjects(data?.subjects)
        // setSubject(data?.subjects[0])


    }, [data])
    const onSubjectSpecificationSubmit = (e: any) => {
        e.preventDefault()

        // setSubjectSpecialization({
        //     specialization: subjectDescriptions,
        //     subject: subject.id
        // })
        setSlide(FormSlide.schedule)

    }
    const SecondaryButton = ({ label, }: any) => {

        return (
            <button type="submit" onClick={onSubjectSpecificationSubmit} className={` w-40 rounded-lg py-2 px-4 font-raleway text-white bg-secondary shadow-lg font-semibold text-xl`}>
                {label}
            </button>
        )
    }
    const RenderSubjectDescriptions = () => {
        return (
            <>
                {subjectSpecialization.specialization?.map((subjectDesc) => {
                    return (
                        <div className='flex flex-row items-center space-x-8'>

                            <img onClick={() => {
                                setSubjectSpecialization({ specialization: [...subjectSpecialization.specialization.filter((desc) => desc.title !== subjectDesc.title)], subject: subjectSpecialization.subject })
                            }} src='/assets/minus.svg' className='h-4 w-4 cursor-pointer' />
                            <h4 className=''>{subjectDesc.title}</h4>
                        </div>
                    )
                })}
            </>)
    }

    const onSubjectDescriptionSubmit = ({ title, description }) => {

        // setSubjectDescriptions([...subjectDescriptions, { title, description }])
        setSubjectSpecialization({
            ...subjectSpecialization,
            specialization: subjectSpecialization.specialization?.concat({ title, description }) || [{ title, description }],
        })
        // console.log(subjectDescriptions);

        closeModal()
    }


    const AddSubjectSpec = () => {

        return (

            <Modal>

                <SubjectSpecModal onSubmit={onSubjectDescriptionSubmit} closeModal={closeModal} />

            </Modal >

        )
    }
    return (
        <>
            <div className='flex flex-col items-center space-y-12'>

                <h3 className="text-center text-xl font-semibold">Choose Subject</h3>

                <SecondarySelectField label='Subject' data={subjects?.map((subj) => {
                    return {
                        value: subj.id,
                        label: subj.name
                    }
                }) || []} onClick={(e) => {
                    e.preventDefault();
                    // console.log(e.target.value);
                    // setSubjectSpecialization({
                    //     ...subjectSpecialization,
                    //     subject: e.target.value
                    // })
                    setSubject(subjects.find(s => s.id === e.target.value))
                }} />
                <h3 className='text-xl italic'>Subject Specialization</h3>
                <div className='pointer-events-auto w-60 flex flex-col   font-raleway space-y-6'>
                    <RenderSubjectDescriptions />
                    <div className='flex flex-row items-center space-x-8'>

                        <img onClick={openModal} src='/assets/plus.svg' className='h-4 w-4 cursor-pointer' />
                        <h4 className='cursor-pointer' onClick={openModal}>Subject Specialization</h4>
                    </div>

                </div>    {isOpen &&
                    <AddSubjectSpec />
                }



                <SecondaryButton label='next' />
            </div>
        </ >
    )
}