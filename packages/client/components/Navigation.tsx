import { useAuth } from 'lib/auth'
import React from 'react'
import { CoachingStatus, Role } from '__generated__/globalTypes'
import dynamic from 'next/dynamic'
import { CURRENT_USER } from 'utililites/schema'
import { currentUser } from 'utililites/__generated__/currentUser'
import { useQuery } from '@apollo/client'

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

    const {data:user} = useQuery<currentUser>(CURRENT_USER)
    const isActive = () => {

        if (user?.currentUser){
          const currentUser = user.currentUser
          if (currentUser.accountStatus !== CoachingStatus.active) {
            return false;
          }
          return true;
        }
        return false
      } 
      const isAuthorized = (role: Role) => {
        // console.log('auth', cookie.get('user') as currentUser_currentUser);
        // const user = cookie.get('user') as currentUser_currentUser
        console.log(user);
        
        if (user?.currentUser) {
            const currentUser = user.currentUser
          if (currentUser.role === Role.admin) {
            return true;
          }
          if (currentUser.role !== role) {
            return false;
          }
          return true;
        }
        return false;
      }
    if (!isActive()) {
       
        
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
