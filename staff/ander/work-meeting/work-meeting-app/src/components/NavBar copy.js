import React, { useState, useEffect } from 'react'
import { retrieveUser, retrieveWorkGroupPref} from 'work-meeting-client-logic'


function Home({token, userName, workGroupPref, workGroupPrefId,onGoToGroup, onGoToMeeting,  onLogout}) {
    const [name, setName] = useState()
    const [workGroupPrefName, setworkGroupPrefName] = useState()
  
    /* const [_token, setToken] = useState(token)  */
    /* const [_token, setToken] = useState(token)  */
    /* useEffect(() => {
          try {
            retrieveWorkGroupPref(token)
            .then(workGroup => { 
              if(!workGroup) return
              else setworkGroupPrefName(workGroup.name)
              
            })
            .catch(error => {if(error) throw error})
          } catch (error) {
            if (error) throw error
          }
          try {
           retrieveUser(token)
            .then(body=> setName(body.name))
            .catch(error => {if(error) throw error})
          } catch (error) {
            if (error) throw error
          }
       
      }, []) */

      /* useEffect(() => {
        setName(userName)
        setworkGroupPrefName(workGroupPref)
        setworkGroupPrefId(workGroupPrefId)

      }, []) */

      function handleGoToGroup(event){
        event.preventDefault()
        onGoToGroup()
      }
      function handleOnLogout(event){
          event.preventDefault()
          onLogout()
      }
      function handleGoToMeeting(event){
        event.preventDefault()
        onGoToMeeting()
    }
   
    return <section className="home">
        <nav className='home__nav-bar'>
            <a className='home__link' href='' >{name}</a>
  {workGroupPrefName? <a className='home__link' href='' onClick={handleGoToGroup}>{workGroupPrefName}</a>:<a className='home__link' href='' onClick={handleGoToGroup}>Create or enter in a Group</a> }
            <a className='home__link' href='' >Meetings</a>
            <a className='home__link' href='' onClick={handleGoToMeeting}>Create Meeting</a>
            <a className='home__link' href='' onClick={handleOnLogout} >Logout</a>
            </nav> 
    </section>
}
export default Home