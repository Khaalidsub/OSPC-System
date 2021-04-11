import { useLazyQuery } from "@apollo/client"
import { SubjectSpecModal } from "components/apply"
import { SecondarySelectField } from "components/InputFields"
import { useModal } from "hooks/useModal"
import React, { useState } from "react"
import { APPLY_COACH_SUBJECTS } from "utililites/schema"
import { subjects_subjects, subjects } from "utililites/__generated__/subjects"
import { CreateSubjectDescription } from "__generated__/globalTypes"

export const SubjectChosen = ({ setError, onSubmit }) => {
    const { openModal, closeModal, isOpen, Modal } = useModal()
    const [fetchSubjects, { data }] = useLazyQuery<subjects>(APPLY_COACH_SUBJECTS)
    const [subjectDescriptions, setSubjectDescriptions] = useState([] as CreateSubjectDescription[])
    const [subject, setsubject] = useState({} as subjects_subjects)
    const onSubjectSpecificationSubmit = (e: any) => {
        // e.preventDefault()
        if (subjectDescriptions.length === 0 || !subject) {
            setError('Subject application incomplete')
        } else
            onSubmit({
                specialization: subjectDescriptions,
                subject: subject.id
            }, subject)


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
                {subjectDescriptions.map((subjectDesc) => {
                    return (
                        <div key={subjectDesc.title} className='flex flex-row items-center space-x-8'>

                            <img onClick={() => {
                                setSubjectDescriptions(subjectDescriptions.filter((desc) => desc.title !== subjectDesc.title))
                            }} src='/assets/minus.svg' className='h-4 w-4 cursor-pointer' />
                            <h4 className=''>{subjectDesc.title}</h4>
                        </div>
                    )
                })}
            </>)
    }
    const onSubjectDescriptionSubmit = ({ title, description }) => {

        setSubjectDescriptions([...subjectDescriptions, { title, description }])
        console.log(subjectDescriptions);

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

                <SecondarySelectField onChange={() => { fetchSubjects() }} value={subject?.id || 'Undefined'} label='Subject' data={data?.subjects.map((subject) => { return { value: subject.id, label: subject.name } })} onClick={(e) => {
                    const selectSubject = data?.subjects.find(s => s.id === e.target.value);
                    setsubject(selectSubject)

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