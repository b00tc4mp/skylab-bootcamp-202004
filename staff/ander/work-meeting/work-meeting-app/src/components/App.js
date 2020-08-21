import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import NavBar from './NavBar'
import WorkGroups from './WorkGroup'
import CreateMeeting from './CreateMeeting'
import MeetingList from './MeetingList'
import { Route, withRouter, Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import logic, { logoutUser,context, retrieveWorkGroups, retrieveWorkGroupPref, isUserLoggedIn, isUserSessionValid, isUserAuthenticated } from 'work-meeting-client-logic'



context.storage = sessionStorage
debugger
function App({ history }) {
  let [token, setToken] = useState()
/*   let [workGroups, setWorkGroups] = useState()*/
  let [workGroupPref, setWorkGroupPref] = useState() 
  let [count, setCount] = useState(0)

  useEffect(() => {
    if (sessionStorage.token)
      try {
        isUserAuthenticated(sessionStorage.token)
          .then(isAuthenticated => {
            if (isAuthenticated) {
              setToken(sessionStorage.token)
            } else history.push('./landing')
          })
          .catch(error => { throw error })
      } catch (error) {
        if (error) throw error
      }
    else history.push('/')
  }, [])

  useEffect(()=>{
    
    try {
      debugger
      retrieveWorkGroupPref(token)
      .then(workgroup=> setWorkGroupPref(workgroup.name))
      .catch(()=>setWorkGroupPref("Create or search work groups"))
    } catch (error) {
      debugger
      setWorkGroupPref("Create or search work groups")
    }
  },[count])


  const handleLogin = () =>{debugger; 
    setCount(count+1)
    history.push('./meetingList')}
  const handleRegister = () => history.push('./login')
  const handleGoToLogin = () => history.push('./login')
  const handleGotoRegister = () => history.push('./register')
  const handleGoToWorkGroups = ()=> history.push('./workgroups')
  const handleLogout = () => {
    logoutUser()

    history.push('/login')
  }
  const handleGoToMeeting = () => {
    history.push('./createMeeting')
  }
  const handleGoToMeetingList = ()=>{
    history.push('./meetingList')
  }
  const handleWorkGroupPref = (name) => {
    setWorkGroupPref(name)
  }
  return (
    <div className="App">
      <header className="App-header">
     {isUserLoggedIn() && <NavBar workGroupPref={workGroupPref} onGoToWorkGroups={handleGoToWorkGroups} onGoToCreateMeeting={handleGoToMeeting}onGoToMeetingList={handleGoToMeetingList} onLogout={handleLogout} />}
        <Route exact path="/" render={() => isUserLoggedIn() ? <Redirect to="/meeting" /> : <Landing />} />
        <Route path='/workgroups' render={() => isUserLoggedIn() ? <WorkGroups onWorkGroupPref = {handleWorkGroupPref}/> : <Redirect to="/" />} />
        <Route path='/createMeeting' render={() => isUserLoggedIn() ? <CreateMeeting /> : <Redirect to="/" />} />
        <Route path='/meetingList' render={() => isUserLoggedIn() ? <MeetingList /> : <Redirect to="/" />} />
        <Route path='/register' render={() => isUserLoggedIn() ? <Redirect to="/meeting" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />} />
        <Route path='/login' render={() => isUserLoggedIn() ? <Redirect to="/meeting" /> : <Login onGoToRegister={handleGotoRegister} onLogin={handleLogin} />} />
      </header>
    </div>
  )
}


export default withRouter(App)

