import { useMutation, useQuery } from '@apollo/client'
import { PrimaryButton, SecondarySelectField, SelectField } from 'components'
import { useModal } from 'hooks/useModal'
import React, { useEffect, useReducer, useState } from 'react'
import { APPLY_AS_COACH, APPLY_COACH_SUBJECTS } from 'utilities/schema'
import { days, ISelectFieldValue } from 'utilities/util'
import * as SubjectsTypes from 'utilities/__generated__/subjects'
import * as ApplyAsCoachTypes from 'utilities/__generated__/applyAsCoach'
import { CreateSubjecSpecialization, CreateSubjectDescription, CreateWeeklyScheduleInput, Day, ScheduleInputType } from '__generated__/globalTypes'
import { SubjectSpecModal } from 'components/apply'
import { ActionType, initialSchedule, ScheduleReducer } from 'reducer/schedule'

enum FormSlide {
    subject,
    schedule,
    confirmation,
    complete,
}
export const ApplyAsCoach = () => {
    const [slide, setSlide] = useState(FormSlide.subject)
    const [applyAsCoach] = useMutation<ApplyAsCoachTypes.applyAsCoach, ApplyAsCoachTypes.applyAsCoachVariables>(APPLY_AS_COACH)
    const [subjectSepcialization, setsubjectSepcialization] = useState({} as CreateSubjecSpecialization)
    const [subject, setsubject] = useState({} as SubjectsTypes.subjects_subjects)
    const [weeklySchedule, setweeklySchedule] = useState({} as CreateWeeklyScheduleInput)
    const [message, setError] = useState('')
    const DisplayError = () => {
        return (
            <div className="bg-red-100 space-x-2 items-center border border-red-500 text-red-dark pl-4 pr-8 py-3 rounded flex flex-row" role="alert">
                <span className="">
                    <svg className="h-6 w-6 text-red-800 " onClick={() => {
                        setError('')
                    }} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
                {/* <strong className="font-bold">Error</strong> */}
                <span className="">{message}</span>
            </div>
        )
    }
    const onApplySubmit = async (e) => {
        e.preventDefault()
        try {
            const coach = await applyAsCoach({ variables: { createSubjectSpecialization: subjectSepcialization, createWeeklySchedule: weeklySchedule } })
        } catch (error) {
            // console.log(error);
            setError(error.message)
        }
    }
    const RenderSlide = () => {
        if (slide === FormSlide.schedule) {
            return (
                <Schedule onSubmit={(weeklySchedule: CreateWeeklyScheduleInput) => {
                    setweeklySchedule(weeklySchedule)
                    setSlide(FormSlide.confirmation)

                }} />
            )
        }

        return (
            <SubjectChosen onSubmit={(subjectSpec: CreateSubjecSpecialization, subject: SubjectsTypes.subjects_subjects) => {
                setsubjectSepcialization(subjectSpec)
                setsubject(subject)
                setSlide(FormSlide.schedule)
            }} />
        )
    }

    if (slide === FormSlide.confirmation) {
        return (
            <ConfirmationDetails setError={setError} message={message} weeklySchedule={weeklySchedule} subject={subject} subjectSpec={subjectSepcialization} onSubmit={onApplySubmit} />
        )
    }

    return (

        <div className="mx-20 my-2  ">
            <div className="bg-white shadow-lg rounded-lg px-6 py-12 space-y-12 justify-center ">
                <h2 className=" text-3xl font-poppins text-center">Apply as a Coach</h2>
                {message && <DisplayError />}
                <div className="flex row justify-center space-x-24">
                    <div className="flex flex-col items-center space-y-12">
                        <div onClick={() => setSlide(FormSlide.subject)} className="cursor-pointer h-20 w-20 bg-gray-100 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Choose Subject</h4>
                    </div>
                    <div className="flex flex-col items-center space-y-12">
                        <div onClick={() => setSlide(FormSlide.schedule)} className=" cursor-pointer h-20 w-20 bg-gray-50 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Schedule</h4>
                    </div>
                    <div className="flex flex-col items-center space-y-12">
                        <div onClick={() => setSlide(FormSlide.confirmation)} className=" cursor-pointer h-20 w-20 bg-gray-50 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Confirmation Details </h4>
                    </div>

                </div>
                <RenderSlide />
            </div>
        </div>
    )
}
const ConfirmationDetails = ({ setError, message, onSubmit, weeklySchedule, subjectSpec, subject }) => {
    const DisplayError = () => {
        return (
            <div className="bg-red-100 space-x-2 items-center border border-red-500 text-red-dark pl-4 pr-8 py-3 rounded flex flex-row" role="alert">
                <span className="">
                    <svg className="h-6 w-6 text-red-800 " onClick={() => {
                        setError('')
                    }} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
                {/* <strong className="font-bold">Error</strong> */}
                <span className="">{message}</span>
            </div>
        )
    }
    const RenderTableBody = () => {

        return (
            <>
                {weeklySchedule.schedule.map((scheduleValue: ScheduleInputType) => {
                    return (
                        <tr className='font-raleway' key={scheduleValue.day} >
                            <td className='text-center capitalize'>{scheduleValue.day}</td>
                            <td>
                                <div className='p-3  flex flex-row items-center space-x-2 justify-center'>
                                    <p>{scheduleValue.time_start}:00</p>
                                </div>
                            </td>
                            <td>
                                <div className='p-3  flex flex-row items-center space-x-2 justify-center'>
                                    <p>{scheduleValue.time_end}:00</p>

                                </div>
                            </td>

                        </tr>
                    )
                })}
            </>
        )

    }
    const SecondaryButton = ({ label, }: any) => {

        return (
            <button type="submit" onClick={onSubmit} className={` w-40 rounded-lg py-2 px-4 font-raleway text-white bg-secondary shadow-lg font-semibold text-xl`}>
                {label}
            </button>
        )
    }
    const RenderSubjectDescriptions = () => {
        return (
            <>
                {subjectSpec.specialization.map((subjectDesc) => {
                    return (
                        <div className='flex flex-row items-center space-x-8'>


                            <h4 className=''>{subjectDesc.title}</h4>
                        </div>
                    )
                })}
            </>)
    }
    return (
        <div className='mx-20 my-2 flex flex-col space-y-12'>
            <div className="bg-white shadow-lg rounded-lg px-6 py-6 space-y-12 justify-center">
                <h2 className=" text-3xl font-poppins text-center">Apply as a Coach</h2>
                {message && <DisplayError />}
                <div className="flex row justify-center space-x-24">
                    <div className="flex flex-col items-center space-y-12">
                        <div className="h-20 w-20 bg-gray-100 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Choose Subject</h4>
                    </div>
                    <div className="flex flex-col items-center space-y-12">
                        <div className="h-20 w-20 bg-gray-50 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Schedule</h4>
                    </div>
                    <div className="flex flex-col items-center space-y-12">
                        <div className="h-20 w-20 bg-green-100 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Confirmation Details </h4>
                    </div>

                </div>
            </div>
            <div className='grid grid-cols-3 gap-14'>
                <div className=' flex flex-col justify-between'>
                    <div className='bg-white shadow-lg rounded-md p-4'>
                        <h2 className='text-2xl'>Subject Chosen</h2>
                        <h3>{subject.name}</h3>
                    </div>
                    <div className='bg-white shadow-lg rounded-md p-4'>
                        <h2 className='text-2xl mb-4'>Specification</h2>
                        <RenderSubjectDescriptions />
                    </div>
                </div>
                <div className='col-span-2 bg-white shadow-lg rounded-md p-4'>
                    <h2 className='text-center text-3xl m-2 mb-4'>Schedule</h2>
                    <table className='w-full table-fixed'>
                        <thead className='font-poppins'>
                            <tr>
                                <th>Day</th>
                                <th>Starting Time</th>
                                <th>Ending Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <RenderTableBody />
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='self-center'>

                <SecondaryButton label='apply' />
            </div>
        </div>
    )
}
const Schedule = ({ onSubmit }) => {
    const [schedule, dispatch] = useReducer(ScheduleReducer, initialSchedule)
    const [weeklySchedule, setweeklySchedule] = useState({} as CreateWeeklyScheduleInput)
    const onSubmitWeeklySchedule = (e: any) => {
        e.preventDefault()
        setweeklySchedule({ schedule: schedule })
        onSubmit({ schedule: schedule })
    }


    const RenderTableBody = () => {

        return (
            <>
                {schedule.map((scheduleValue: ScheduleInputType) => {
                    return (
                        <tr key={scheduleValue.day} >
                            <td className='text-center capitalize'>{scheduleValue.day}</td>
                            <td>
                                <div className='p-3  flex flex-row items-center space-x-2 justify-center'>
                                    <img onClick={() => dispatch({ type: ActionType.RemoveStart, day: scheduleValue.day, payload: scheduleValue.time_start - 1 })} className="cursor-pointer h-3 w-3" src="/assets/left-arrow.svg" alt="" />
                                    <p>{scheduleValue.time_start}:00</p>
                                    <img onClick={() => dispatch({ type: ActionType.AddStart, day: scheduleValue.day, payload: scheduleValue.time_start + 1 })} className="cursor-pointer h-3 w-3" src="/assets/right-arrow.svg" alt="" />

                                </div>
                            </td>
                            <td>
                                <div className='p-3  flex flex-row items-center space-x-2 justify-center'>
                                    <img onClick={() => dispatch({ type: ActionType.RemoveEnd, day: scheduleValue.day, payload: scheduleValue.time_end - 1 })} className="cursor-pointer h-3 w-3" src="/assets/left-arrow.svg" alt="" />
                                    <p>{scheduleValue.time_end}:00</p>
                                    <img onClick={() => dispatch({ type: ActionType.AddEnd, day: scheduleValue.day, payload: scheduleValue.time_end + 1 })} className="cursor-pointer h-3 w-3" src="/assets/right-arrow.svg" alt="" />

                                </div>
                            </td>

                        </tr>
                    )
                })}
            </>
        )

    }
    const SecondaryButton = ({ label, }: any) => {

        return (
            <button type="submit" onClick={onSubmitWeeklySchedule} className={` w-40 rounded-lg py-2 px-4 font-raleway text-white bg-secondary shadow-lg font-semibold text-xl`}>
                {label}
            </button>
        )
    }
    return (
        <>
            <div className=' flex flex-col items-center space-y-8'>

                <h3 className="text-center text-3xl font-semibold">Setup your Schedule</h3>
                <table className="w-full table-fixed">
                    <thead className='font-poppins'>
                        <tr>
                            <th className='w-2/6' >Day</th>
                            <th className='w-4/12'>Starting Time</th>
                            <th className='w-4/12'>Ending Time</th>

                        </tr>
                    </thead>
                    <tbody className='font-raleway'>
                        <RenderTableBody />
                    </tbody>

                </table>
                <SecondaryButton label='next' />
            </div>
        </>
    )
}


const SubjectChosen = ({ onSubmit }: any) => {

    const { openModal, closeModal, isOpen, Modal } = useModal()
    const { data, loading, error } = useQuery<SubjectsTypes.subjects>(APPLY_COACH_SUBJECTS)
    const [subjects, setsubjects] = useState([] as ISelectFieldValue[])
    const [subjectDescriptions, setSubjectDescriptions] = useState([] as CreateSubjectDescription[])
    const [subject, setsubject] = useState({} as SubjectsTypes.subjects_subjects)
    useEffect(() => {

        setsubjects(data?.subjects.map((subj) => {
            return {
                value: subj.id,
                label: subj.name
            }
        }))
        setsubject(data?.subjects[0])

    }, [data])
    const onSubjectSpecificationSubmit = (e: any) => {
        e.preventDefault()
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
                                setSubjectDescriptions([...subjectDescriptions.filter((desc) => desc.title !== subjectDesc.title)])
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

                <SecondarySelectField label='Subject' data={subjects} onClick={(e) => {
                    e.preventDefault();
                    // console.log(e.target.value);
                    const selectSubject = data.subjects.find(s => s.id === e.target.value);
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
export default ApplyAsCoach