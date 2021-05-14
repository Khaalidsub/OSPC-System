import { SearchField, SecondaryButton, SelectField } from "components"
import React, { useEffect, useState } from "react"
import { CoachingStatus } from "__generated__/globalTypes"
import * as CoachingTypes from 'utilities/__generated__/coaches'
import { ACCEPT_COACH, COACHES, REJECT_COACH } from "utilities/schema"
import { useMutation, useQuery } from "@apollo/client"
import { profileDefault } from "utililites/util"
interface CoachProps {
    coach: CoachingTypes.coaches_pendingCoaches
}
export const Coaches = () => {
    const { data, fetchMore } = useQuery<CoachingTypes.coaches>(COACHES)
    const [coaches, setCoaches] = useState([] as CoachingTypes.coaches_pendingCoaches[])
    const [approvecoach,] = useMutation(ACCEPT_COACH)
    const [rejectCoach,] = useMutation(REJECT_COACH)
    const [resultCoaches, setResultCoaches] = useState([] as CoachingTypes.coaches_pendingCoaches[])
    const [status, setStatus] = useState(undefined as CoachingStatus)
    const [search, setSearch] = useState('')
    useEffect(() => {
        setCoaches(data?.pendingCoaches || [])
        setResultCoaches(data?.pendingCoaches)
    }, [data])
    useEffect(() => {
        const result = coaches.filter(coach => {
            return coach.name.toLowerCase().includes(search)
        })
        setResultCoaches(result)
    }, [search])

    useEffect(() => {

        const result = coaches.filter(coach => {
            if (!status) {
                return true;
            }
            return coach.coachingStatus === status
        })
        setResultCoaches(result)
    }, [status])

    const onRejectcoach = async (id: string) => {
        try {
            await rejectCoach({ variables: { id } })
            await fetchMore({ query: COACHES })
        } catch (error) {
            console.log(error);

        }
    }
    const onApprovecoach = async (id: string) => {
        try {
            await approvecoach({ variables: { id } })
            await fetchMore({ query: COACHES })
        } catch (error) {
            console.log(error);

        }
    }


    const Coach = (coach: CoachProps) => {
        let status = 'bg-primary'
        switch (coach.coach.coachingStatus) {
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
            <div className="relative flex flex-row bg-white  justify-between rounded-lg shadow-md  p-4 space-y-4">
                <div className="flex flex-row space-x-4 items-center">

                    <img className="h-28 w-28 rounded-full" src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${coach.coach.image|| profileDefault}`} alt="" />
                    <div className="flex flex-col space-y-4">


                        <h2 className="font-raleway text-2xl" >{coach.coach.name}</h2>
                        <h4 className="uppercase">{coach.coach.university}</h4>
                        <h4>{coach.coach.email}</h4>

                    </div>
                </div>

                <div className="flex flex-col px-6 w-44  justify-between items-center space-y-3 ">
                    <div className={`${status} w-24 p-1 rounded-lg text-center`}>
                        <h3 className='text-xs' >{coach.coach.coachingStatus}</h3>
                    </div>

                    {coach.coach.coachingStatus === CoachingStatus.pending ? (<><SecondaryButton onClick={() => {
                        onApprovecoach(coach.coach.id)
                    }} color='bg-secondary' label="Approve" />
                        <SecondaryButton color="bg-red-800" label="Reject" onClick={() => {
                            onRejectcoach(coach.coach.id)
                        }} /></>)
                        : <></>}
                </div>

            </div>
        )
    }

    const RenderCoachList = () => {
        return (
            <>
                {resultCoaches.map((coach) => {
                    return <Coach key={coach.id} coach={coach} />
                })}
            </>
        )
    }
    return (
        <div className="grid grid-cols-1" >
            <div className="flex flex-col space-y-8 w-3/5 place-self-center ">
                <h2 className="text-4xl capitalize">List of coaches Application Status</h2>
                <div className="grid grid-cols-2">
                    <SearchField placeholder='Search Coach Name' setSearch={setSearch} search={search} />
                    <div className='justify-self-end self-center'>

                        <SelectField label='Status' value={status} onClick={(e) => {
                            setStatus(e.target.value)
                        }} options={[CoachingStatus.active, CoachingStatus.pending, CoachingStatus.rejected]} />
                    </div>
                </div>
                <RenderCoachList />

            </div>
        </div>
    )
}

export default Coaches