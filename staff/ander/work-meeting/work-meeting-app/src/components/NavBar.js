import React, { useState, useEffect } from 'react'
import { context, retrieveWorkGroupPref, retrieveUser } from 'work-meeting-client-logic'
import './NavBar.sass'
import logo from '../assets/logo2.png'

function Navbar({ workGroupPref, onGoToWorkGroups, onGoToCreateMeeting, onGoToMeetingList, onLogout }) {
  const { token } = context.storage
  const [workGroupPrefName, setWorkGroupPrefName] = useState()
  const [name, setName] = useState()
  const [view, setView] = useState()
  debugger
  useEffect(() => {
    (async () => {
      if (workGroupPref) { setWorkGroupPrefName(workGroupPref) }

    })()
  })

  useEffect(() => {
    (async () => {

      try {
        debugger
        let workGroup = await retrieveWorkGroupPref(token)
        if (workGroup) setWorkGroupPrefName(workGroup.name)
      } catch (error) {
        setWorkGroupPrefName("Create or enter in group")
      }

      try {
        let user = await retrieveUser(token)
        if (user) setName(user.name)
      } catch (error) {

      }

    })()
  }, [])

  function handleGoToGroup(event) {
    debugger
    event.preventDefault()
    setView('workGroup')
    onGoToWorkGroups()
  }
  function handleOnLogout(event) {
    event.preventDefault()
    setWorkGroupPrefName("Create or enter in group")
    onLogout()
  }
  function handleGoToMeeting(event) {
    event.preventDefault()
    setView('createMeeting')
    onGoToCreateMeeting()
  }
  function handleGoToMeetingList(event) {
    event.preventDefault()
    setView('meeting')
    onGoToMeetingList()
  }
  /* {`home__link ${this.state.view === 'profile' ? 'home__link--active' : ''}`} */
  return <section className="home">
    <nav className='home__navbar'>
      
    <img className='home__image' src={logo}></img>
      <a className='home__link'  href='' >{name}</a>
      <a className={`home__link ${view ==='workGroup' ? 'home__link--active' : ""}`} href='' onClick={handleGoToGroup}>{workGroupPrefName}</a>
      <a className={`home__link ${view ==='meeting' ? 'home__link--active' : ""}`}  href='' onClick={handleGoToMeetingList}>Meetings</a>
      <a className={`home__link ${view ==='createMeeting' ? 'home__link--active' : ""}`}  href='' onClick={handleGoToMeeting}>Create Meeting</a>
      <a className='home__link' href='' onClick={handleOnLogout} >Logout</a>
    </nav>
  </section>
}
export default Navbar