import Landing  from './Landing'
import Register from './Register'
import Login from './Login'
import NavBar from './NavBar'
import WorkGroup from './WorkGroup'
import Meeting from './Meeting'
import { Route, withRouter, Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { isUserAuthenticated, retrieveWorkGroup, retrieveWorkGroupPref } from 'work-meeting-client-logic'



function App({history}) {

const [token, setToken] = useState()
const [workGroupPrefName, setWorkGroupPrefName]= useState()
const [workGroupPrefId, setWorkGroupPrefId]= useState()
const [workGroupsList, setWorkGroupsList] = useState()

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
  else history.push('/')

  
}, [])

useEffect(async () => {
  
  const result= await retrieveWorkGroupPref(token)
  if(result){
      try {
          const {name, _id} = await retrieveWorkGroupPref(token)
          setWorkGroupPrefName(name)
          setWorkGroupPrefId(_id) 
         /*  const petitions =await retrievePetitionAll(_id, _token)
          setpetitions(petitions)
           */
          const workGroups = await retrieveWorkGroup(token)
          setWorkGroupsList(workGroups)
          
       } catch (error) {
          if (error) throw error
        }
  }else{ return 
  
  }

  
}, [])


const handleLogin = (token)=>{
    sessionStorage.token = token
    setToken(token)
    history.push('./meeting')}
const handleWorkGroup = (name, _workGroups) => {setWorkGroupPrefName(name)
                                                           setWorkGroupsList(_workGroups)}
const handleRegister = () => history.push('./login')
const handleGoToLogin= () => history.push('./login')
const handleGotoRegister=()=> history.push('./register')
const onWorkGroup=()=> {history.push('./workGroup')}
const handleLogout = () => {
  setToken()
  delete sessionStorage.token

  history.push('/login')
}
const handleGoToMeeting = ()=>{
  history.push('./meeting')
}


  return ( 
    <div className="App">
      <header className="App-header">
      {token && <NavBar token={token} workGroupPref={workGroupPrefName} workGroupPrefId={workGroupPrefId} onGoToGroup={onWorkGroup} onGoToMeeting={handleGoToMeeting} onLogout={handleLogout} />} 
      <Route exact path="/" render={() =>token ? <Redirect to="/meeting" /> :  <Landing/>} />
      {/* <Route path='/home' render={()=> token ? <NavBar token={token} onGoToGroup={onWorkGroup} onGoToMeeting={handleGoToMeeting} onLogout={handleLogout}/> :  <Redirect to="/" />} /> */}
      <Route path='/workGroup' render={()=> token ? <WorkGroup _token={token}  workGroupsList={workGroupsList} myWorkGroup={handleWorkGroup}/> :  <Redirect to="/" />}/>
      <Route path='/meeting' render={()=> token ? <Meeting token={token}/> :  <Redirect to="/" />}/>
      <Route path='/register' render={()=> token ? <Redirect to="/meeting" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>}/>
      <Route path='/login' render={()=> token ? <Redirect to="/home" /> : <Login onGoToRegister={handleGotoRegister} onLogin={handleLogin}/>}/>
      </header>
    </div>
  )
}


export default withRouter(App)

