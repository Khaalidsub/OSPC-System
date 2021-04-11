import { useLazyQuery } from "@apollo/client"
import { SubjectSpecModal } from "components/apply"
import { SecondarySelectField } from "components/InputFields"
import { useModal } from "hooks/useModal"
import React, { useEffect, useState } from "react"
import { APPLY_COACH_SUBJECTS } from "utililites/schema"
import { subjects_subjects, subjects } from "utililites/__generated__/subjects"
import { CreateSubjectDescription } from "__generated__/globalTypes"

export const SubjectChosen = ({ setError, onSubmit }) => {
    const { openModal, closeModal, isOpen, Modal } = useModal()
    const [fetchSubjects, { data }] = useLazyQuery<subjects>(APPLY_COACH_SUBJECTS)
    const [subjectDescriptions, setSubjectDescriptions] = useState([] as CreateSubjectDescription[])
    const [subject, setsubject] = useState({} as subjects_subjects)
    const [description, setDescription] = useState('')
    const [descriptionErr, setDescriptionErr] = useState('')
    const onSubjectSpecificationSubmit = (e: any) => {
        // e.preventDefault()
        if (subjectDescriptions.length === 0 || !subject || descriptionErr) {
            setError('Subject application incomplete')
        } else
            onSubmit({
                specialization: subjectDescriptions,
                subject: subject.id
            }, subject, description)


    }
    useEffect(() => {
        if (!description || !description.trim()) {
            setDescriptionErr('Description required')
        } else {
            setDescriptionErr('')
        }
    }, [description])

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
            <div className='flex flex-col items-center space-y-12 w-3/4 mx-auto'>
                <h3 className="text-center text-xl font-semibold">Choose Subject</h3>

                <SecondarySelectField onChange={() => { fetchSubjects() }} value={subject?.id || 'Undefined'} label='Subject' data={data?.subjects.map((subject) => { return { value: subject.id, label: subject.name } })} onClick={(e) => {
                    const selectSubject = data?.subjects.find(s => s.id === e.target.value);
                    setsubject(selectSubject)

                }} />
                <h3 className='text-xl italic'>Subject Specialization</h3>
                <div className='pointer-events-auto flex flex-col   font-raleway space-y-6'>
                    <RenderSubjectDescriptions />
                    <div className='flex flex-row items-center space-x-8'>

                        <img onClick={openModal} src='/assets/plus.svg' className='h-4 w-4 cursor-pointer' />
                        <h4 className='cursor-pointer' onClick={openModal}>Subject Specialization</h4>
                    </div>

                </div>    {isOpen &&
                    <AddSubjectSpec />
                }
                <h3 className="text-center text-xl font-semibold">Coach Description</h3>
                <div className="text-xl w-1/2">
                    <label className="text-sm font-poppins pb-2">Description</label>

                    {descriptionErr && <h4 className="text-red-500 text-xs" >{descriptionErr}</h4>}
                    <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} name='description' placeholder='describe yourself' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                </div>

                <SecondaryButton label='next' />
            </div>
        </ >
    )
}