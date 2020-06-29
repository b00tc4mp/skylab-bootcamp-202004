import React, { useEffect } from 'react';
import { Route, withRouter, Redirect} from 'react-router-dom';
import { isSessionActive, isSessionValid, logoutUser } from 'moove-it-client-logic'
import FloorPlan from './components/FloorPlan'
import Register from './components/Register';
import Login from './components/Login'
import Home from './components/Home';


function App({ history }) {

  useEffect(()=>{
    if(isSessionActive())
    try{
      isSessionValid()
        .then(authenticated => {
          if(authenticated) {
          }
        })
        .catch(error => {throw error})
    } catch (error) {
      if(error) throw error
    }
    else history.push('/')
  },[])

  const handleGoToRegister = () => history.push('/')

  const handleRegister = () => history.push('./login')

  const handleLogin = () => history.push('/home')

  const handleGoToHome = () => history.push('/home')

  const handleGoToLogin = () => history.push('/login')

  const handlePlaneInit = (id) => { 
  history.push(`/blueprint/${id}`)
  }
  const blueprint = {};


  //TODO function to uptdate blueprint with existing data


  // TODO function to save blueprin on database

  const handleLogout = () => {
    logoutUser()

    history.push('/')
  }
  return (
    <div className="app">
      <header className="app-header">
        
          <Route exact path='/' render={() => 
            isSessionActive()? <Redirect to="home" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>}/>
          
          <Route path="/login" render={() => 
          isSessionActive()? <Redirect to="home" /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister}/>}/>
          
          <Route path="/home" render={() => 
          isSessionActive()? <Home blueprint={blueprint} onLogout={handleLogout} onGoToFloorPlan={handlePlaneInit} /> : <Redirect to="/"/> }/>

          <Route path='/blueprint/:id' render={props => 
          isSessionActive()? <FloorPlan blueprintId={props.match.params.id} onGoToHome={handleGoToHome}/> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>}/>
        
      </header>
    </div>
  )

}

export default withRouter(App)