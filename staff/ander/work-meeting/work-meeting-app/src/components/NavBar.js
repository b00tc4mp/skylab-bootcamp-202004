import React, { useState, useEffect } from 'react'
import { retrieveWorkGroupPref} from 'work-meeting-client-logic'

function Navbar({workGroupPref,token, onGoToGroup, onGoToMeeting,  onLogout}) {
      /* const [workGroupPrefName, setWorkGroupPrefName] = useState(workGroupPref)
    
      useEffect( () => {
        (async ()=>{
          debugger
        let workGroup = await retrieveWorkGroupPref(token)
        if(workGroup) setWorkGroupPrefName(workGroup.name)
           if (workGroupPref) setWorkGroupPrefName(workGroupPref)
          else setWorkGroupPrefName("Create or enter in group")  
           setWorkGroupPrefName(workGroupPref) 
        })()
        }, [workGroupPrefName])  */
      function handleGoToGroup(event){
        debugger
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
            <a className='home__link' href='' >nombre</a>
            {/* {workGroupPrefName? <a className='home__link' href='' onClick={handleGoToGroup}>{workGroupPrefName}</a>:<a className='home__link' href='' onClick={handleGoToGroup}>Create or enter in a Group</a> } */}
            <a className='home__link' href='' onClick={handleGoToGroup}>workgroup</a>
            <a className='home__link' href='' >Meetings</a>
            <a className='home__link' href='' onClick={handleGoToMeeting}>Create Meeting</a>
            <a className='home__link' href='' onClick={handleOnLogout} >Logout</a>
            </nav> 
    </section>
}
export default Navbar