import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, /* BrowserRouter, */ withRouter, Redirect } from 'react-router-dom'
import {checkAuthentication} from 'qrmenu-client-logic';
import RegisterEstablishment from './RegisterEstablishment';
import Login from './Login'
import Home from './Home'

function App({history}) {
  const [token, setToken] = useState()
  const [view, setView] = useState()

  useEffect(() => {
    if(sessionStorage.token)
      try {
        checkAuthentication(sessionStorage.token)
          .then(isAuthenticated => {
            if(isAuthenticated) {
              setToken(sessionStorage.token)
            }
          })
          .catch(error => {throw Error})
      } catch (error) {
        if(error) throw error
      }
    else history.push('/login')
  }, [])

  const handleGoToLogin = () => history.push('/login')
  const handleRegister = () => history.push('/login')
  const handleGoToRegister = () => history.push('/register')
  const handleLogin = token => {
    setToken(token)
    sessionStorage.token = token  
    history.push('/')
  }

  const handleOnLogout = () => {
    delete sessionStorage.token

    history.push('/login')
  }

  return (
    <section className="App">
        {/* <Container> */}
          <Route path="/register" render={() => 
            token? <Redirect to="/"/> : <RegisterEstablishment onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>
          } />

          <Route path="/login" render={() => 
            token? <Redirect to="/"/> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister}/>
          } />

          <Route path="/" render={() => 
            token? <Home onLogout={handleOnLogout}/> : <Redirect to="/login"/> 
          } />

    </section>
  );
}

export default withRouter(App);
