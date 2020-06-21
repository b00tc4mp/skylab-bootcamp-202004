import React, { useEffect } from 'react';
import { Route, withRouter, Redirect} from 'react-router-dom';
import { isSessionActive, isSessionValid, logoutUser } from 'moove-it-client-logic'
import Container from './components/Container'
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
            // setToken(sessionStorage.token)
          }
        })
        .catch(error => {throw error})
    } catch (error) {
      if(error) throw error
    }
    else history.push('/')
  },[])

  const handleGoToRegister = () => history.push('/register')

  const handleRegister = () => history.push('./login')

  const handleLogin = () => history.push('/home')

  const handleGoToLogin = () => history.push('/login')

  const handleLogout = () => {
    logoutUser()

    history.push('/')
  }
  return (
    <div className="app">
      <header className="app-header">
        <Container>
          <Route exact path='/' render={() => 
            isSessionActive()? <Redirect to="home" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>}/>

          <Route path="/register" render={() => 
          isSessionActive()? <Redirect to="home" /> : <Register onRegister={handleRegister}/>}/>
          
          <Route path="/login" render={() => 
          isSessionActive()? <Redirect to="home" /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister}/>}/>
          
          <Route path="/home" render={() => 
          isSessionActive()? <Home onLogout={handleLogout}/> : <Redirect to="/"/> }/>
        </Container>
      </header>
    </div>
  )

}

export default withRouter(App)