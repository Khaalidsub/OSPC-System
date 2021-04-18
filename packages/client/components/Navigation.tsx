import React from 'react'
import { CoachingStatus, Role } from '__generated__/globalTypes'
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
export const Navigation = ({currentUser}) => {

    
    const isActive = () => {

        if (currentUser){
          
          if (currentUser.accountStatus !== CoachingStatus.active) {
            return false;
          }
          return true;
        }
        return false
      } 
      const isAuthorized = (role: Role) => {
 
        
        if (currentUser) {
      
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
