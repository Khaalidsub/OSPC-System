import { useMutation, } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { APPLY_AS_COACH, APPLY_COACH_SUBJECTS } from 'utilities/schema'
import * as SubjectsTypes from 'utilities/__generated__/subjects'
import * as ApplyAsCoachTypes from 'utilities/__generated__/applyAsCoach'
import { CreateSubjecSpecialization, CreateSubjectDescription, CreateWeeklyScheduleInput, Day, ScheduleInputType } from '__generated__/globalTypes'
import { useRouter } from 'next/router'
import DisplayError from 'components/Cards/ErrorCard'
import { ConfirmationDetails, Schedule, SubjectChosen } from 'components/ApplyCoach'

enum FormSlide {
    subject,
    schedule,
    confirmation,
    complete,
}
enum bgColor {
    gray = 'bg-gray-100',
    green = 'bg-green-200',
    primary = 'bg-secondary'
}
export const ApplyAsCoach = () => {
    const [slide, setSlide] = useState(FormSlide.subject)
    const [subjectColor, setSubjectColor] = useState(bgColor.primary)
    const [scheduleColor, setScheduleColor] = useState(bgColor.gray)
    const [confirmationColor, setConfirmationColor] = useState(bgColor.gray)
    const [applyAsCoach] = useMutation<ApplyAsCoachTypes.applyAsCoach, ApplyAsCoachTypes.applyAsCoachVariables>(APPLY_AS_COACH)
    const [subjectSepcialization, setsubjectSepcialization] = useState({} as CreateSubjecSpecialization)
    const [subject, setsubject] = useState({} as SubjectsTypes.subjects_subjects)
    const [weeklySchedule, setweeklySchedule] = useState({} as CreateWeeklyScheduleInput)
    const [message, setError] = useState('')
    const router = useRouter()
    useEffect(() => {
        switch (slide) {
            case FormSlide.subject:
                setSubjectColor(bgColor.primary)
                setConfirmationColor(bgColor.gray)
                setScheduleColor(bgColor.gray)
                break;
            case FormSlide.schedule:
                setSubjectColor(bgColor.gray)
                setConfirmationColor(bgColor.gray)
                setScheduleColor(bgColor.primary)
                break;
            case FormSlide.confirmation:
                setSubjectColor(bgColor.gray)
                setConfirmationColor(bgColor.green)
                setScheduleColor(bgColor.gray)

            default:
                break;
        }
    }, [slide])

    const onApplySubmit = async (e) => {
        e.preventDefault()
        try {
            await applyAsCoach({ variables: { createSubjectSpecialization: subjectSepcialization, createWeeklySchedule: weeklySchedule } })
            router.push('/dashboard')
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
            <SubjectChosen setError={setError} onSubmit={(subjectSpec: CreateSubjecSpecialization, subject: SubjectsTypes.subjects_subjects) => {
                setsubjectSepcialization(subjectSpec)
                setsubject(subject)
                setSlide(FormSlide.schedule)
            }} />
        )

    }


    return (

        <div className="grid grid-cols-1 w-3/4 mx-auto">
            <div className="bg-white shadow-lg rounded-lg px-6 py-12 space-y-12 justify-center ">
                <h2 className=" text-3xl font-poppins text-center">Apply as a Coach</h2>
                {message && <DisplayError message={message} setError={setError} />}
                <div className="flex row justify-center space-x-24">
                    <div className="flex flex-col items-center space-y-12">
                        <div onClick={() => setSlide(FormSlide.subject)} className={`cursor-pointer h-20 w-20 ${subjectColor} rounded-full flex justify-center items-center`}>
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Choose Subject</h4>
                    </div>
                    <div className="flex flex-col items-center space-y-12">
                        <div onClick={() => setSlide(FormSlide.schedule)} className={` cursor-pointer h-20 w-20 ${scheduleColor} rounded-full flex justify-center items-center`}>
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Schedule</h4>
                    </div>
                    <div className="flex flex-col items-center space-y-12">
                        <div onClick={() => setSlide(FormSlide.confirmation)} className={`cursor-pointer h-20 w-20 ${confirmationColor} rounded-full flex justify-center items-center`}>
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Confirmation Details </h4>
                    </div>

                </div>
                {(slide === 0 || slide === 1) && <RenderSlide />}
            </div>
            {(slide === 2) &&
                <ConfirmationDetails weeklySchedule={weeklySchedule} subject={subject} subjectSpec={subjectSepcialization} onSubmit={onApplySubmit} />
            }
        </div>
    )
}


export default ApplyAsCoach