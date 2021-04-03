import { useQuery } from "@apollo/client"
import { InformationButton } from "components"
import { useRouter } from "next/router"
import React from "react"
import { COACH } from "utilities/schema"
import { coach, coachVariables, coach_user, coach_getCoachSchedule, coach_getCoachSchedule_schedule } from 'utilities/__generated__/coach'
import { Day, ScheduleInputType } from "__generated__/globalTypes"
interface CoachProps {
    coach: coach_user
}
interface IDaySchedule extends coach_getCoachSchedule_schedule {
    difference: number

}
export const Coach = () => {
    const router = useRouter()
    const { id } = router.query
    const { data } = useQuery<coach, coachVariables>(COACH, { variables: { id: id as string } })
    console.log(data);

    const CoachProfileCard = ({ coach }: CoachProps) => {
        return (

            <div className="p-2  flex flex-row space-x-12 items-stretch">
                <img className="w-2/12 cursor-pointer rounded-lg" src="/fake_images/fake_user.png" alt="" />
                <div className="flex flex-col w-full space-y-3 pt-2 overflow-hidden pr-5">
                    <div className="flex flex-row justify-between">
                        <h3 className=" cursor-pointer hover:underline text-5xl font-semibold">{coach?.name}</h3>
                        <div className="bg-badgs p-1 rounded-md">
                            <h3 className="text-secondary text-xs" >top Rated</h3>
                        </div>
                    </div>
                    <h3 className="text-md italic">{ }</h3>
                    <p className=" prose prose-sm line-clamp-1 lg:line-clamp-2 leading-relaxed font-raleway">loremId ad duis enim ad cillum dolor. Voluptate officia incididunt esse irure nulla in tempor officia sit officia. Laboris commodo velit ex esse laboris cupidatat labore voluptate quis commodo deserunt. Ad occaecat consectetur excepteur esse reprehenderit consequat. Mollit ex consectetur magna commodo dolor laborum ipsum esse voluptate nulla minim ullamco.</p>
                    <div className="flex flex-row w-full">
                        <InformationButton label="Book" />
                    </div>
                </div>
            </div>
        )
    }
    const CoachDescription = () => {
        return (<div className='bg-white p-4 rounded-lg shadow-md '> <p className='line-clamp-4'>Tempor exercitation laborum eu irure cupidatat deserunt consequat dolor dolor laborum. Ea do commodo non quis aute ea quis pariatur in amet laborum exercitation amet. Anim in adipisicing aute occaecat ex ad culpa duis eu.
        Cupidatat excepteur duis magna ipsum est sunt irure amet proident eu laborum tempor aute quis. Duis pariatur non in cupidatat anim reprehenderit mollit duis nisi. In non mollit laboris anim commodo dolore ut nulla eiusmod dolore sit nisi est deserunt. Sit magna sit amet ullamco deserunt consequat cupidatat. Mollit amet cillum exercitation incididunt aute commodo ex do do veniam dolor sit non veniam. Deserunt non ex esse non ex ea nostrud occaecat non sint laboris cillum.
        Lorem laboris consectetur fugiat do duis ea proident exercitation sit do. Sint esse sunt pariatur magna elit et nulla. Magna ex tempor anim reprehenderit adipisicing cupidatat labore eiusmod ad consectetur irure. Et culpa minim nulla do dolore sit ipsum. Labore culpa incididunt aliquip sint reprehenderit sit culpa non proident veniam.
        Nulla ea cupidatat enim magna commodo ullamco ea anim qui. Lorem ullamco pariatur deserunt pariatur aliquip incididunt labore ad. Ex enim irure nulla deserunt in officia officia minim.
        Lorem aliquip aliquip aliquip fugiat ullamco dolore anim dolore. Eiusmod excepteur aliqua ipsum nulla consectetur culpa. Cupidatat mollit aliqua fugiat commodo fugiat incididunt ea tempor non occaecat.
Amet laborum ipsum occaecat officia do pariatur velit proident velit. Fugiat pariatur aliquip consectetur quis cupidatat incididunt proident do consectetur aliquip consectetur. Labore culpa sunt enim exercitation. Ullamco irure ut eu labore non ex proident do Lorem proident in culpa velit sunt.</p> </div>)
    }
    const CoachSchedule = () => {
        return (

            <div className='bg-white p-4 rounded-lg shadow-md space-y-8'>
                <h4 className='text-3xl'> Schedule</h4>
                <div className='grid grid-cols-7 gap-2'>
                    {data?.getCoachSchedule.schedule.map((scheduleValue) => {

                        return <DaySchedule key={scheduleValue.day} {...scheduleValue} />
                    })}
                </div>
            </div>
        )
    }
    const DaySchedule = ({ day, time_end, time_start }: coach_getCoachSchedule_schedule) => {//the booked lessons of the day too
        let elements: JSX.Element[] = []
        for (let i = time_start; i <= time_end; i++) {
            elements.push(<h4 key={i} className="hover:underline cursor-pointer text-lg">{i}:00</h4>)

        }
        return (
            <>
                <div className="text-center space-y-4">
                    <h4 className="capitalize text-tertiary  border-2">{day}</h4>
                    {elements}
                </div>
            </>
        )
    }
    const SubjectSpecialization = () => {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className='text-3xl my-4'>Subject Specialization</h4>
                {data?.getUserSpecialization.specialization.map((specialization) => {
                    return (
                        <div key={specialization.title} className="space-y-4">
                            <hr />
                            <h3 className='capitalize font-bold'>{specialization.title}</h3>
                            <p>{specialization.description}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1">
            <div className='flex flex-col space-y-8 w-2/3 place-self-center '>

                <CoachProfileCard coach={data?.user} />
                <CoachDescription />
                <CoachSchedule />
                <SubjectSpecialization />
            </div>
        </div>
    )
}
export default Coach