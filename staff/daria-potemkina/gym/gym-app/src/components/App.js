import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import './App.sass'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Landing from './Landing'
import { isUserAuthenticated } from 'gym-client-logic'

function App({ history }) {
  const [token, setToken] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (sessionStorage.token){
      try {
        isUserAuthenticated(sessionStorage.token)
          .then(isAuthenticated => {
            if (isAuthenticated) {
              setToken(sessionStorage.token)
            }
          })
          .catch(error => { throw error })
      } catch (error) {
        setError(error)
      }
    }else history.push('/')
  }, [history])

  const handleGoToRegister = () => history.push('/register')

  const handleRegister = () => history.push('./login')

  const handleLogin = token => {
    sessionStorage.token = token
    setToken(token)

    history.push('/home')
  }

  const handleGoToLogin = () => history.push('/login')

  const handleLogout = () => {
    setToken()
    delete sessionStorage.token

    history.push('/')
  }
  return (
    <div className="App">
      <header className="App-header">
      <Route exact path="/" render={() => token ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin}/>} />
        <Route path="/register" render={() => 
        token ? <Redirect to="/home" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>} />

        <Route path="/login" render={() =>
          token ? <Redirect to="/home"/> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}/>

        <Route path="/home" render={() =>
          token ? <Home onLogout={handleLogout} token={token} /> : <Redirect to="/login" />}/>
      </header>
    </div>
  );
}

export default withRouter(App)
