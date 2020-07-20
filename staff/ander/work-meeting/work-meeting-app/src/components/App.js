import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import NavBar from './NavBar'
import WorkGroups from './WorkGroup'
import Meeting from './Meeting'
import { Route, withRouter, Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { isUserAuthenticated, retrieveWorkGroup, retrieveWorkGroupPref } from 'work-meeting-client-logic'



function App({ history }) {
  const [token, setToken] = useState(sessionStorage.token)
  let [workGroups, setWorkGroups] = useState()
  let [workGroupPref, setWorkGroupPref] = useState()
  



  useEffect(() => {

    if (sessionStorage.token)
      try {
        isUserAuthenticated(sessionStorage.token)
          .then(isAuthenticated => {
            if (isAuthenticated) {
              setToken(sessionStorage.token)
            }
          })
          .catch(error => { throw error })
      } catch (error) {
        if (error) throw error
      }
    /* else history.push('/') */


  }, [])

  useEffect( () => {
  (async ()=>{
    
    workGroups = await retrieveWorkGroup(token)
    setWorkGroups(workGroups)
  })()
  }, []) 

  useEffect( () => {
    (async ()=>{
      debugger
      /* let workGroup = await retrieveWorkGroupPref(token)
      if(workGroup) setWorkGroupPref(workGroup.name) */
      
    })()
    }, [workGroupPref]) 

  const handleLogin = (token) => {
    (async ()=>{
      debugger
    /*   let workGroup = await retrieveWorkGroupPref(token)
      if(workGroup) setWorkGroupPref(workGroup.name) */
      
      sessionStorage.token = token
      setToken(token)
      
      
      history.push('./meeting')
    })()
    
    
    
  }
  const handleRegister = () => history.push('./login')
  const handleGoToLogin = () => history.push('./login')
  const handleGotoRegister = () => history.push('./register')
  const onWorkGroup = async () => { 
    workGroups = await retrieveWorkGroup(token)
    setWorkGroups(workGroups)
    history.push('./workgroups') 
  }

  const handleLogout = () => {
    setToken()
    delete sessionStorage.token

    history.push('/login')
  }
  const handleGoToMeeting = () => {
    history.push('./meeting')
  }
const handleWorkGroup = (name)=>{setWorkGroups(name)}
const handleWorkGroupPref = (name)=>{setWorkGroupPref(name)}

  return (
    <div className="App">
      <header className="App-header">
{/*   {token && <NavBar workGroup={workGroupPref} token={token} onGoToGroup={onWorkGroup} onGoToMeeting={handleGoToMeeting} onLogout={handleLogout} />}
 */}    {token && <NavBar workGroup={workGroupPref} token={token} onGoToGroup={onWorkGroup} onGoToMeeting={handleGoToMeeting} onLogout={handleLogout} />}
        <Route exact path="/" render={() => token ? <Redirect to="/meeting" /> : <Landing />} />
        <Route path='/workgroups' render={() => token ? <WorkGroups workGroups={workGroups} token={token} onWorkGroup={handleWorkGroup} onWorkGroupPref={handleWorkGroupPref}/> : <Redirect to="/pepito" />} />
        <Route path='/meeting' render={() => token ? <Meeting token={token} /> : <Redirect to="/" />} />
        <Route path='/register' render={() => token ? <Redirect to="/meeting" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />} />
        <Route path='/login' render={() => token ? <Redirect to="/meeting" /> : <Login onGoToRegister={handleGotoRegister} onLogin={handleLogin} />} />
      </header>
    </div>
  )
}


export default withRouter(App)

