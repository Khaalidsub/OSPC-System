import { SearchField, SecondaryButton, SelectField } from "components"
import React, { useEffect, useState } from "react"
import * as ModeratorTypes from 'utilities/__generated__/moderators'
import { useMutation, useQuery } from "@apollo/client"
import { MODERATORS } from "utilities/schema"
import { useRouter } from "next/router"
import { profileDefault } from "utililites/util"
interface ModeratorProps {
    moderator: ModeratorTypes.moderators_moderators
}
export const Moderators = () => {
    const { data, fetchMore, refetch } = useQuery<ModeratorTypes.moderators>(MODERATORS)
   
    // const [moderators, setCoaches] = useState([] as ModeratorTypes.coaches_pendingCoaches[])
    // const [approvecoach,] = useMutation(ACCEPT_COACH)
    // const [rejectCoach,] = useMutation(REJECT_COACH)
    // const [resultCoaches, setResultCoaches] = useState([] as ModeratorTypes.coaches_pendingCoaches[])
    // const [status, setStatus] = useState(undefined as CoachingStatus)
    const [moderators, setModerators] = useState([] as ModeratorTypes.moderators_moderators[])
    const [search, setSearch] = useState('')
    const router = useRouter()
    const {  isRefetch } = router.query
    useEffect(() => {
        if (isRefetch) {
            refetch()
        }
    }, [isRefetch])
    useEffect(() => {

        setModerators(data?.moderators)
    }, [data])
    useEffect(() => {
        const result = data?.moderators.filter(student => {
            return student.name.toLowerCase().includes(search)
        })
        setModerators(result)
    }, [search])




    const Moderator = (moderator: ModeratorProps) => {

        return (
            <div className="relative flex flex-row bg-white  justify-between rounded-lg shadow-md  p-4 space-y-4">
                <div className="flex flex-row space-x-4 items-center">

                    <img className="h-28 w-28 rounded-full" src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${moderator.moderator.image ||profileDefault}`} alt="" />
                    <div className="flex flex-col space-y-4">


                        <h2 className="font-raleway text-2xl" >{moderator.moderator.name}</h2>
                        {/* <h4 className="uppercase">{moderator.moderator.}</h4> */}
                        <h4>{moderator.moderator.email}</h4>

                    </div>
                </div>

                <div className="flex flex-col px-6 w-44  justify-between items-center space-y-3 ">
                    <div className='w - 24 p-1 rounded-lg text-center'>
                        <h3 className='text-xs' >{moderator.moderator.accountStatus}</h3>
                    </div>


                </div>

            </div>
        )
    }

    const RenderModeratorList = () => {
        return (
            <>
                {moderators?.map((moderator) => {
                    return <Moderator key={moderator.id} moderator={moderator} />
                })}
            </>
        )
    }
    return (
        <div className="grid grid-cols-1" >
            <div className="flex flex-col space-y-8 w-3/5 place-self-center ">
                <h2 className="text-4xl capitalize">List of Moderators</h2>
                <div className="grid grid-cols-2">
                    <SearchField placeholder='Search Moderator Name' setSearch={setSearch} search={search} />
                    <div className='justify-self-end self-center'>
                        <SecondaryButton onClick={() => {
                            router.push('/admin/moderators/add')
                        }} label='Add Moderator' />

                    </div>
                </div>
                <RenderModeratorList />

            </div>
        </div>
    )
}

export default Moderators