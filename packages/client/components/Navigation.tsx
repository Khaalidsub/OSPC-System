import React, { useEffect, useState } from 'react'
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


export const useNavigation = ({ currentUser }) => {
  const [Navigation, setNavigation] = useState(<StudentNavigation />)
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    if (currentUser) {

      if (currentUser.accountStatus !== CoachingStatus.active) {
        setIsActive(false)
      }else setIsActive(true)
            
    }else setIsActive(false)
          

  }, [currentUser])
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
  useEffect(() => {
    if (!isActive) {
      setNavigation(<></>)
    }else{
      
      if(currentUser.role === Role.admin)
        setNavigation(<AdminNavigation />)
      if(currentUser.role === Role.coach)
        setNavigation(<CoachNavigation />)
      if(currentUser.role === Role.moderator)
        setNavigation(<ModeratorNavigation />)
      if (currentUser.role === Role.student) 
        setNavigation(<StudentNavigation />)
        // return (<AdminNavigation />)
      
      
    }
  }, [isActive])

  // console.log(isActive,Navigation);
  



  const RoleNavigation = ()=>{
    return (
      <>
      {Navigation}
      </>
    )
  }
  return {
    RoleNavigation,
    isActive
  }
}
