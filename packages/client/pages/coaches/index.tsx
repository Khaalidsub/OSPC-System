import { useQuery } from "@apollo/client"
import { CoachCard, SelectField } from "components"
import { withAuth } from "components/withAuth"
import { useRouter } from "next/router"
import React from "react"
import { ACTIVE_COACHES } from "utilities/schema"
import { activeCoaches } from 'utilities/__generated__/activeCoaches'

export const Coaches = () => {
    const router = useRouter()
    const { data: coaches } = useQuery<activeCoaches>(ACTIVE_COACHES)
    // const {} = useQuery()
    const CoachList = () => {
        return (<>
            {coaches?.activeCoaches.map((coach) => {
                return <CoachCard onClick={(e) => { router.push(`/coaches/coach/${coach.id}`) }} key={coach.id} name={coach.name} specialization={coach.email} />
            })}
        </>)
    }
    return (
        <div className="mx-8 lg:mx-16 my-4">

            <div className="flex flex-col space-y-12 items-center">
                {/* <SearchField  /> */}
                <div className="space-x-12">
                    <SelectField label="flueman" options={['choc', 'flue']} />
                    <SelectField label="flueman" options={['choc', 'flue']} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 gap-x-54">
                    <CoachList />
                </div>
            </div>
        </div>
    )
}
export default withAuth(Coaches)