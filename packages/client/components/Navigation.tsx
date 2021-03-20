import { useAuth } from 'lib/auth'
import React from 'react'
import { Role } from '__generated__/globalTypes'
import dynamic from 'next/dynamic'

const StudentNavigation = dynamic(() =>
    import('./Navigations').then((mod) => mod.StudentNavigation)
)
const ModeratorNavigation = dynamic(() =>
    import('./Navigations').then((mod) => mod.ModeratorNavigation)
)
const AdminNavigation = dynamic(() =>
    import('./Navigations').then((mod) => mod.AdminNavigation)
)
const CoachNavigation = dynamic(() =>
    import('./Navigations').then((mod) => mod.CoachNavigation)
)
export const Navigation = () => {
    const { isSignedIn, isAuthorized } = useAuth()
    if (!isSignedIn()) {
        return <></>
    }
    if (isAuthorized(Role.admin)) {
        return (<AdminNavigation />)
    }
    if (isAuthorized(Role.coach)) {
        return (<CoachNavigation />)
    }
    if (isAuthorized(Role.moderator)) {
        return (<ModeratorNavigation />)
    }
    return (
        <StudentNavigation />
    )
}
